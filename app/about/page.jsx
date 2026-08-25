import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Handshake, BadgeCheck, MessageSquare, Users, ArrowRight, Building2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Arrive Safely — a trucking and delivery business providing dependable, safety-focused transportation for contractors and businesses.",
};

const values = [
  { icon: ShieldCheck, title: "Safety", text: "Every load is handled with responsibility and care from pickup to delivery." },
  { icon: BadgeCheck, title: "Reliability", text: "We show up when we say we will and deliver on our commitments." },
  { icon: Users, title: "Professionalism", text: "Our team represents your business with respect and dependable conduct." },
  { icon: MessageSquare, title: "Communication", text: "Clear, consistent updates keep you informed at every step." },
  { icon: Handshake, title: "Customer Commitment", text: "We build long-term partnerships, not one-time deliveries." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Arrive Safely"
        heading="Driven by Safety. Built on Reliability."
        description="A trucking and contractor delivery company built around dependable, professional transportation."
        image="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80"
        alt="Commercial truck on the highway representing Arrive Safely's operations"
      />

      <section className="bg-white py-24">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="section-label">Who We Are</span>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase leading-tight text-deep-navy sm:text-4xl">
              A Trucking &amp; Delivery Partner You Can Trust
            </h2>
            <span className="mt-5 block h-1 w-16 rounded-full bg-brand-red" />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Arrive Safely is a trucking and delivery business providing
              dependable transportation services to contractors and businesses.
              We specialize in contractor delivery, freight transportation, and
              logistics coordination — built around a simple standard: cargo
              handled safely and delivered on time, every time.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative h-80 w-full overflow-hidden rounded-sm shadow-xl sm:h-[26rem]">
              <Image
                src="/about.png"
                alt="Logistics driver reviewing delivery details near a commercial truck"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-24">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative h-80 w-full overflow-hidden rounded-sm shadow-xl sm:h-[26rem] lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1768207750854-fb0cbd9c19f0?q=80"
                alt="Warehouse and distribution facility supporting logistics operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="section-label">Our Mission</span>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase leading-tight text-deep-navy sm:text-4xl">
              Safe, Dependable, Professional Transportation
            </h2>
            <span className="mt-5 block h-1 w-16 rounded-full bg-brand-red" />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Our mission is to provide safe, dependable, and professional
              transportation services while building long-term relationships
              through communication, reliability, and integrity.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-center rounded-sm border border-slate-200 bg-bg px-6 py-12 text-center sm:px-12">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                <Building2 size={26} />
              </span>
              <span className="section-label mt-5">Corporate &amp; Contract Delivery</span>
              <h2 className="mt-3 max-w-xl font-heading text-2xl font-bold uppercase leading-tight text-deep-navy sm:text-3xl">
                Trusted by Companies &amp; Corporations
              </h2>
              <span className="mt-4 h-1 w-16 rounded-full bg-brand-red" />
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                In addition to contractor and business deliveries, Arrive Safely
                also takes on contract delivery work for companies and
                corporations — including Amazon, Walmart, and other national
                retailers. If your business needs a dependable contracted
                delivery partner, we&apos;re ready to talk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading label="What Drives Us" heading="Our Values" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="h-full rounded-sm border border-slate-200 bg-bg p-6 transition-colors hover:border-brand-red/50">
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy/10 text-navy">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold uppercase text-deep-navy">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep-navy py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Why Businesses Choose Us</span>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
              A Transportation Partner Built for Business
            </h2>
            <span className="mt-5 block h-1 w-16 rounded-full bg-brand-red" />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">
              Working with a dependable transportation contractor means fewer
              delays, clearer communication, and cargo you can trust to arrive
              on schedule. Arrive Safely gives contractors and businesses a
              transportation partner that treats every delivery with the same
              level of care and accountability as their own operations.
            </p>
            <Link
              href="/booking"
              className="btn-red mt-8 inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm"
            >
              Book a Delivery <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative h-80 w-full overflow-hidden rounded-sm shadow-xl sm:h-[26rem]">
              <Image
                src="https://images.unsplash.com/photo-1592805144716-feeccccef5ac?q=80"
                alt="Aerial view of a highway interchange used for commercial transportation routes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
