import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BookingCTA() {
  return (
    <section className="bg-navy py-20">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl font-heading text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
          Ready to Schedule Your Delivery?
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-white/75">
          Tell us where your cargo needs to go and our team will help coordinate
          the next step.
        </p>
        <Link
          href="/booking"
          className="btn-red mt-2 inline-flex items-center gap-2 rounded-sm px-9 py-4 text-sm"
        >
          Book Delivery <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
