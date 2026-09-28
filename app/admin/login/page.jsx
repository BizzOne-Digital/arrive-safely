"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Unable to sign in");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-deep-navy px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-sm border border-white/10 bg-white p-8 shadow-xl"
      >
        <div className="flex flex-col items-center">
          <span className="relative block h-14 w-40">
            <Image src="/logo.png" alt="Arrive Safely" fill className="object-contain" sizes="160px" />
          </span>
          <h1 className="mt-5 font-heading text-lg font-bold uppercase text-deep-navy">
            Admin Sign In
          </h1>
        </div>

        <div className="mt-6">
          <label htmlFor="password" className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-wide text-deep-navy">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-slate-300 bg-white py-3 pl-9 pr-4 text-sm text-deep-navy focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
              placeholder="Enter admin password"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-brand-red">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-red mt-6 w-full rounded-sm py-3 text-sm disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
