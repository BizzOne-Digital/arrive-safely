"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LocalImageField from "@/components/admin/LocalImageField";
import { SERVICE_ICON_NAMES, getServiceIcon } from "@/lib/serviceIcons";

const emptyForm = {
  title: "",
  description: "",
  icon: "Truck",
  image: "",
  order: 0,
  showOnHome: true,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadServices() {
    setLoading(true);
    const res = await fetch("/api/services", { cache: "no-store" });
    const data = await res.json();
    setServices(data.services || []);
    setLoading(false);
  }

  useEffect(() => {
    loadServices();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, order: services.length + 1 });
    setModalOpen(true);
  }

  function openEdit(service) {
    setEditingId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      image: service.image,
      order: service.order,
      showOnHome: service.showOnHome,
    });
    setModalOpen(true);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (res.ok) {
      loadServices();
    } else {
      alert("Failed to delete service.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = editingId ? `/api/services/${editingId}` : "/api/services";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save service.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setModalOpen(false);
    loadServices();
  }

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Manage the services shown on the Home and Services pages."
        action={
          <button
            onClick={openCreate}
            className="btn-red inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm"
          >
            <Plus size={16} /> Add Service
          </button>
        }
      />

      <main className="container-page py-8">
        <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
          {loading ? (
            <p className="p-8 text-center text-sm text-muted">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted">
              No services yet. Click &quot;Add Service&quot; to create one.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-bg text-xs font-heading font-semibold uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Icon</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Home?</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => {
                  const Icon = getServiceIcon(s.icon);
                  return (
                    <tr key={s._id} className="border-t border-slate-100">
                      <td className="px-5 py-4 text-muted">{s.order}</td>
                      <td className="px-5 py-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy/10 text-navy">
                          <Icon size={18} />
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-deep-navy">{s.title}</td>
                      <td className="px-5 py-4 text-muted">{s.showOnHome ? "Yes" : "No"}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(s)}
                            aria-label="Edit service"
                            className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-navy transition-colors hover:border-navy"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(s._id)}
                            aria-label="Delete service"
                            className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-brand-red transition-colors hover:border-brand-red"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-sm bg-white p-7 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold uppercase text-deep-navy">
                {editingId ? "Edit Service" : "Add Service"}
              </h2>
              <button onClick={() => setModalOpen(false)} aria-label="Close">
                <X size={20} className="text-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
                  Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
                    Icon
                  </label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                  >
                    {SERVICE_ICON_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                    className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>

              <LocalImageField
                label="Service Image"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                folder="services"
              />

              <label className="flex items-center gap-2 text-sm text-deep-navy">
                <input
                  type="checkbox"
                  checked={form.showOnHome}
                  onChange={(e) => setForm({ ...form, showOnHome: e.target.checked })}
                  className="h-4 w-4"
                />
                Show on Home page preview
              </label>

              {error && <p className="text-sm text-brand-red">{error}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-sm border border-slate-300 px-5 py-2.5 font-heading text-sm font-semibold uppercase text-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-red rounded-sm px-6 py-2.5 text-sm disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
