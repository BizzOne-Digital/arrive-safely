"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, X } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LocalImageField from "@/components/admin/LocalImageField";

const emptyForm = { label: "", image: "", order: 0 };

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadImages() {
    setLoading(true);
    const res = await fetch("/api/gallery", { cache: "no-store" });
    const data = await res.json();
    setImages(data.images || []);
    setLoading(false);
  }

  useEffect(() => {
    loadImages();
  }, []);

  function openCreate() {
    setForm({ ...emptyForm, order: images.length + 1 });
    setModalOpen(true);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (res.ok) loadImages();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add image.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setModalOpen(false);
    loadImages();
  }

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Manage the image library used across the site."
        action={
          <button
            onClick={openCreate}
            className="btn-red inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm"
          >
            <Plus size={16} /> Add Image
          </button>
        }
      />

      <main className="container-page py-8">
        {loading ? (
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            Loading gallery...
          </p>
        ) : images.length === 0 ? (
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            No images yet. Click &quot;Add Image&quot; to add one.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((img) => (
              <div key={img._id} className="overflow-hidden rounded-sm border border-slate-200 bg-white">
                <div className="relative h-36 w-full bg-bg">
                  <Image src={img.image} alt={img.label} fill className="object-cover" sizes="25vw" />
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <p className="truncate text-sm font-medium text-deep-navy">{img.label}</p>
                  <button
                    onClick={() => handleDelete(img._id)}
                    aria-label="Delete image"
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm border border-slate-200 text-brand-red transition-colors hover:border-brand-red"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-sm bg-white p-7 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold uppercase text-deep-navy">Add Image</h2>
              <button onClick={() => setModalOpen(false)} aria-label="Close">
                <X size={20} className="text-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
                  Label
                </label>
                <input
                  required
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <LocalImageField
                label="Image"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                folder="gallery"
              />

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
