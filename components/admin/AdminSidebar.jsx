"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Images,
  Wrench,
  Quote,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-white/10 bg-deep-navy">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="relative block h-9 w-9 flex-shrink-0">
          <Image src="/logo.png" alt="Arrive Safely" fill className="object-contain" sizes="36px" />
        </span>
        <span className="font-heading text-base font-bold uppercase tracking-wide text-white">
          Arrive <span className="text-brand-red">Safely</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-sm px-4 py-3 font-heading text-sm font-semibold uppercase tracking-wide transition-colors ${
                active
                  ? "bg-white/10 text-brand-red"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-sm px-4 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-white/60 transition-colors hover:bg-white/5 hover:text-brand-red"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </aside>
  );
}
