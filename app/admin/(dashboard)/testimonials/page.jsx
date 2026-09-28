"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const emptyForm = { name: "", company: "", quote: "", published: true, order: 0 };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    setLoading(true);
    const res = await fetch("/api/testimonials", { cache: "no-store" });
    const data = await res.json();
    setItems(data.testimonials || []);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, order: items.length + 1 });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingId(item._id);
    setForm({
      name: item.name,
      company: item.company || "",
      quote: item.quote,
      published: item.published,
      order: item.order,
    });
    setModalOpen(true);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) loadItems();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save testimonial.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setModalOpen(false);
    loadItems();
  }

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description="Manage client testimonials shown on the Home page."
        action={
          <button
            onClick={openCreate}
            className="btn-red inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm"
          >
            <Plus size={16} /> Add Testimonial
          </button>
        }
      />

      <main className="container-page py-8">
        {loading ? (
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            Loading testimonials...
          </p>
        ) : items.length === 0 ? (
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            No testimonials yet. Click &quot;Add Testimonial&quot; to create one.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((t) => (
              <div key={t._id} className="rounded-sm border border-slate-200 bg-white p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-sm font-bold text-deep-navy">
                      {t.name} {t.company ? `— ${t.company}` : ""}
                    </p>
                    <span
                      className={`mt-1 inline-block rounded-sm px-2 py-0.5 text-xs font-semibold uppercase ${
                        t.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {t.published ? "Published" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(t)}
                      aria-label="Edit testimonial"
                      className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-navy transition-colors hover:border-navy"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      aria-label="Delete testimonial"
                      className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-brand-red transition-colors hover:border-brand-red"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm italic leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-sm bg-white p-7 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold uppercase text-deep-navy">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button onClick={() => setModalOpen(false)} aria-label="Close">
                <X size={20} className="text-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
                    Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
                    Company (optional)
                  </label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
                  Quote
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <label className="mt-6 flex items-center gap-2 text-sm text-deep-navy">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="h-4 w-4"
                  />
                  Published on Home page
                </label>
              </div>

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
