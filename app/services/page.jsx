import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Truck,
  Boxes,
  MapPin,
  Route,
  ClipboardList,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Services",
  description:
    "Contractor delivery, freight transportation, logistics coordination, and scheduled delivery services from Arrive Safely.",
};

const services = [
  {
    icon: Package,
    title: "Contractor Delivery Services",
    description:
      "Delivery support for contractor and commercial projects, including materials and job-site deliveries handled with care and reliability.",
    image:
      "/ser1.png",
  },
  {
    icon: Truck,
    title: "Delivery Contractor Services",
    description:
      "Flexible outsourced delivery support for companies requiring dependable transportation without the overhead of managing an in-house fleet.",
    image:
      "/ser2.png",
  },
  {
    icon: Boxes,
    title: "Freight & Cargo Transportation",
    description:
      "Secure transportation solutions for commercial goods, with careful handling and consistent communication throughout transit.",
    image:
      "/ser3.png",
  },
  {
    icon: MapPin,
    title: "Local Delivery",
    description:
      "Reliable transportation within the local service region for businesses that need fast, dependable turnaround.",
    image:
      "/ser4.png",
  },
  {
    icon: Route,
    title: "Long-Distance Transportation",
    description:
      "Professional transportation for longer routes where available, backed by the same safety and communication standards.",
    image:
      "/ser5.png",
  },
  {
    icon: ClipboardList,
    title: "Logistics Coordination",
    description:
      "Support with scheduling, transportation planning, and delivery coordination to keep your operations running smoothly.",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1400&auto=format&fit=crop",
  },
  {
    icon: CalendarDays,
    title: "Scheduled Deliveries",
    description:
      "Pre-arranged transportation services for businesses and contractors who need predictable, recurring delivery windows.",
    image:
      "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?q=80",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        heading="Transportation Solutions That Keep Business Moving"
        description="Dependable trucking, contractor delivery, and logistics services built around your schedule."
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2000&auto=format&fit=crop"
        alt="Highway interchange representing Arrive Safely's transportation network"
      />

      <section className="bg-white py-24">
        <div className="container-page space-y-16">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 100}>
              <article
                className={`grid gap-10 overflow-hidden rounded-sm border border-slate-200 bg-bg lg:grid-cols-2 lg:items-stretch ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative h-64 w-full lg:h-full lg:min-h-[20rem]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy/10 text-navy">
                    <service.icon size={24} />
                  </span>
                  <h2 className="mt-5 font-heading text-2xl font-bold uppercase text-deep-navy sm:text-3xl">
                    {service.title}
                  </h2>
                  <span className="mt-3 h-[3px] w-12 bg-brand-red" />
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="btn-navy mt-7 inline-flex w-fit items-center gap-2 rounded-sm px-7 py-3.5 text-sm"
                  >
                    Contact for Pricing <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2000&auto=format&fit=crop"
        heading="Ready to Move Forward With a Reliable Partner?"
        description="Request a quote for your transportation, contractor delivery, or logistics need — our team will follow up promptly."
        primaryHref="/contact"
        primaryLabel="Request a Quote"
      />
    </>
  );
}
