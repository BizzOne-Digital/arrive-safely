"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/gif";

export default function LocalImageField({ label, value, onChange, folder = "misc" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleFile(file) {
    if (!file) return;
    setError("");
    setSuccess(false);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Upload failed. Please try again.");
        setUploading(false);
        return;
      }

      onChange(data.url);
      setUploading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch {
      setError("Upload failed. Please try again.");
      setUploading(false);
    }
  }

  function handleRemove() {
    onChange("");
    setError("");
    setSuccess(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      {label && (
        <label className="mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="flex items-center gap-4 rounded-sm border border-slate-300 p-3">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-bg">
            <Image src={value} alt="Preview" fill className="object-cover" sizes="64px" />
          </div>
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-sm border border-slate-300 px-4 py-2 text-xs font-semibold uppercase text-deep-navy transition-colors hover:border-navy disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Replace"}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="flex items-center gap-1 rounded-sm border border-slate-300 px-4 py-2 text-xs font-semibold uppercase text-brand-red transition-colors hover:border-brand-red disabled:opacity-60"
            >
              <X size={14} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-slate-300 py-8 text-muted transition-colors hover:border-navy hover:text-navy disabled:opacity-60"
        >
          {uploading ? <Loader2 size={22} className="animate-spin" /> : <Upload size={22} />}
          <span className="text-xs font-semibold uppercase">
            {uploading ? "Uploading..." : "Click to upload an image"}
          </span>
          <span className="text-[11px] text-muted/70">JPEG, PNG, WEBP, or GIF — up to 8MB</span>
        </button>
      )}

      {error && <p className="mt-2 text-xs text-brand-red">{error}</p>}
      {success && <p className="mt-2 text-xs text-emerald-600">Image uploaded.</p>}
    </div>
  );
}
