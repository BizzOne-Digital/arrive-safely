import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center group" aria-label="Arrive Safely home">
      <span className="relative block h-14 w-40 flex-shrink-0 transition-transform group-hover:scale-105 sm:h-16 sm:w-48">
        <Image
          src="/logo.png"
          alt="Arrive Safely logo"
          fill
          className="object-contain"
          sizes="192px"
          priority
        />
      </span>
    </Link>
  );
}
