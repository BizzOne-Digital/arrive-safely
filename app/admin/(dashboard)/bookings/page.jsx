"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, MapPin } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-slate-200 text-slate-600",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    setLoading(true);
    const res = await fetch("/api/bookings", { cache: "no-store" });
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleStatusChange(id, status) {
    setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    if (res.ok) loadBookings();
  }

  return (
    <div>
      <AdminPageHeader
        title="Bookings"
        description="Delivery requests submitted through the Booking page form."
      />

      <main className="container-page py-8">
        {loading ? (
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            Loading bookings...
          </p>
        ) : bookings.length === 0 ? (
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            No bookings yet. Submissions from the Booking form will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b._id} className="rounded-sm border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-base font-bold text-deep-navy">{b.fullName}</p>
                    {b.companyName && <p className="text-sm text-muted">{b.companyName}</p>}
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted">
                      <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 hover:text-brand-red">
                        <Mail size={14} /> {b.email}
                      </a>
                      <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 hover:text-brand-red">
                        <Phone size={14} /> {b.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className={`rounded-sm border-0 px-3 py-1.5 text-xs font-semibold uppercase ${STATUS_STYLES[b.status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(b._id)}
                      aria-label="Delete booking"
                      className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-brand-red transition-colors hover:border-brand-red"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <p className="flex items-start gap-2 text-sm text-muted">
                    <MapPin size={15} className="mt-0.5 flex-shrink-0 text-navy" />
                    <span>
                      <span className="font-semibold text-deep-navy">Pickup:</span> {b.pickupLocation}
                    </span>
                  </p>
                  <p className="flex items-start gap-2 text-sm text-muted">
                    <MapPin size={15} className="mt-0.5 flex-shrink-0 text-brand-red" />
                    <span>
                      <span className="font-semibold text-deep-navy">Delivery:</span> {b.deliveryLocation}
                    </span>
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
                  <span><span className="font-semibold text-deep-navy">Service:</span> {b.serviceType}</span>
                  <span><span className="font-semibold text-deep-navy">Date:</span> {b.deliveryDate}</span>
                  {b.deliveryTime && (
                    <span><span className="font-semibold text-deep-navy">Time:</span> {b.deliveryTime}</span>
                  )}
                  {b.contactMethod && (
                    <span><span className="font-semibold text-deep-navy">Contact via:</span> {b.contactMethod}</span>
                  )}
                </div>

                {(b.cargoDescription || b.loadDetails || b.specialInstructions) && (
                  <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm text-muted">
                    {b.cargoDescription && <p><span className="font-semibold text-deep-navy">Cargo:</span> {b.cargoDescription}</p>}
                    {b.loadDetails && <p><span className="font-semibold text-deep-navy">Load Details:</span> {b.loadDetails}</p>}
                    {b.specialInstructions && <p><span className="font-semibold text-deep-navy">Special Instructions:</span> {b.specialInstructions}</p>}
                  </div>
                )}

                <p className="mt-3 text-xs text-muted/70">
                  {new Date(b.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
