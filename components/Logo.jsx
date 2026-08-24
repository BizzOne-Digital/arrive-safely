import Link from "next/link";
import { Truck } from "lucide-react";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="Arrive Safely home">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-sm ${
          light ? "bg-white" : "bg-navy"
        } transition-transform group-hover:scale-105`}
      >
        <Truck className={light ? "text-navy" : "text-white"} size={24} strokeWidth={2.4} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-xl font-bold uppercase tracking-wide ${
            light ? "text-white" : "text-navy"
          }`}
        >
          Arrive <span className="text-brand-red">Safely</span>
        </span>
        <span
          className={`font-body text-[10px] uppercase tracking-[0.2em] ${
            light ? "text-white/60" : "text-muted"
          }`}
        >
          Trucking &amp; Delivery
        </span>
      </span>
    </Link>
  );
}
