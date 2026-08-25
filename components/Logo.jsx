import Link from "next/link";
import Image from "next/image";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="Arrive Safely home">
      <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center transition-transform group-hover:scale-105">
        <Image
          src="/logo.png"
          alt="Arrive Safely logo"
          fill
          className="object-contain"
          sizes="48px"
          priority
        />
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
