import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutPreview() {
  return (
    <section className="bg-white py-24">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="section-label">About Us</span>
          <h2 className="mt-3 font-heading text-3xl font-bold uppercase leading-tight text-deep-navy sm:text-4xl">
            Trucking Solutions You Can Depend On
          </h2>
          <span className="mt-5 block h-1 w-16 rounded-full bg-brand-red" />
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            Arrive Safely is committed to dependable transportation backed by
            professionalism, communication, and safety. Whether you&apos;re moving
            materials, commercial goods, or coordinating contractor deliveries, our
            goal is simple — get your cargo where it needs to go safely and on
            schedule.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-brand-red"
          >
            Learn More <ArrowRight size={16} />
          </Link>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative h-80 w-full overflow-hidden rounded-sm shadow-xl sm:h-[26rem]">
            <Image
              src="/about.png"
              alt="Commercial truck fleet parked at a logistics facility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 border-8 border-white/0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
