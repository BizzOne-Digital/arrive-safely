"use client";

import { useEffect, useState } from "react";
import { Save, KeyRound } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const inputClass =
  "w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelClass = "mb-1.5 block font-heading text-xs font-semibold uppercase text-deep-navy";

export default function AdminSettingsPage() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/settings", { cache: "no-store" });
      const data = await res.json();
      setForm(data.settings);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save settings.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSaved(false);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordSaving(true);

    const res = await fetch("/api/admin/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setPasswordError(data.error || "Failed to change password.");
      setPasswordSaving(false);
      return;
    }

    setPasswordSaving(false);
    setPasswordSaved(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordSaved(false), 3000);
  }

  if (loading || !form) {
    return (
      <div>
        <AdminPageHeader title="Settings" description="Site-wide contact details shown across the site." />
        <main className="container-page py-8">
          <p className="rounded-sm border border-slate-200 bg-white p-8 text-center text-sm text-muted">
            Loading settings...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        description="Site-wide contact details shown in the header, footer, contact and booking pages."
      />

      <main className="container-page py-8">
        <form onSubmit={handleSubmit} className="max-w-2xl rounded-sm border border-slate-200 bg-white p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Phone</label>
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className={labelClass}>Address</label>
            <input
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="mt-6">
            <label className={labelClass}>Header Trust Message</label>
            <input
              value={form.trustMessage}
              onChange={(e) => setForm({ ...form, trustMessage: e.target.value })}
              className={inputClass}
            />
          </div>

          <h2 className="mt-8 font-heading text-sm font-bold uppercase text-deep-navy">
            Social Links (optional)
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Facebook URL</label>
              <input
                value={form.facebookUrl}
                onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                className={inputClass}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input
                value={form.instagramUrl}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                className={inputClass}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                className={inputClass}
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-brand-red">{error}</p>}
          {saved && <p className="mt-4 text-sm text-emerald-600">Settings saved.</p>}

          <button
            type="submit"
            disabled={saving}
            className="btn-red mt-8 inline-flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm disabled:opacity-60"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>

        <form
          onSubmit={handlePasswordSubmit}
          className="mt-8 max-w-2xl rounded-sm border border-slate-200 bg-white p-8"
        >
          <h2 className="font-heading text-sm font-bold uppercase text-deep-navy">
            Change Admin Password
          </h2>
          <p className="mt-1 text-sm text-muted">
            Update the password used to sign in to this admin panel.
          </p>

          <div className="mt-6">
            <label className={labelClass}>Current Password</label>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
              }
              className={inputClass}
            />
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>New Password</label>
              <input
                required
                type="password"
                minLength={8}
                autoComplete="new-password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Confirm New Password</label>
              <input
                required
                type="password"
                minLength={8}
                autoComplete="new-password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted">Must be at least 8 characters.</p>

          {passwordError && <p className="mt-4 text-sm text-brand-red">{passwordError}</p>}
          {passwordSaved && (
            <p className="mt-4 text-sm text-emerald-600">Password updated successfully.</p>
          )}

          <button
            type="submit"
            disabled={passwordSaving}
            className="btn-navy mt-8 inline-flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm disabled:opacity-60"
          >
            <KeyRound size={16} /> {passwordSaving ? "Updating..." : "Update Password"}
          </button>
        </form>
      </main>
    </div>
  );
}
