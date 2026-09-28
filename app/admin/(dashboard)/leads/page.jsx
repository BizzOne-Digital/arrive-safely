"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Phone } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const STATUS_OPTIONS = ["new", "contacted", "closed"];

const STATUS_STYLES = {
  new: "bg-brand-red/10 text-brand-red",
  contacted: "bg-amber-100 text-amber-700",
  closed: "bg-emerald-100 text-emerald-700",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    setLoading(true);
    const res = await fetch("/api/leads", { cache: "no-store" });
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function handleStatusChange(id, status) {
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
    if (res.ok) loadLeads();
  }

  return (
    <div>
      <AdminPageHeader
        title="Leads"
        description="Messages submitted through the Contact page form."
      />

      <main className="container-page py-8">
        {loading ? (
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            Loading leads...
          </p>
        ) : leads.length === 0 ? (
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            No leads yet. Submissions from the Contact form will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead._id} className="rounded-sm border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-base font-bold text-deep-navy">{lead.name}</p>
                    {lead.company && <p className="text-sm text-muted">{lead.company}</p>}
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted">
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-brand-red">
                        <Mail size={14} /> {lead.email}
                      </a>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-brand-red">
                          <Phone size={14} /> {lead.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      className={`rounded-sm border-0 px-3 py-1.5 text-xs font-semibold uppercase ${STATUS_STYLES[lead.status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      aria-label="Delete lead"
                      className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-brand-red transition-colors hover:border-brand-red"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                {lead.subject && (
                  <p className="mt-3 font-heading text-sm font-semibold uppercase text-deep-navy">
                    {lead.subject}
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-muted">{lead.message}</p>
                <p className="mt-3 text-xs text-muted/70">
                  {new Date(lead.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
