import { Package, Truck, Boxes, Route, ShieldCheck } from "lucide-react";
import ServiceCard from "./ServiceCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const services = [
  {
    icon: Package,
    title: "Contractor Delivery",
    description:
      "Reliable delivery support for contractors, construction teams, and commercial projects.",
    image:
      "/ser1.png",
    href: "/services",
  },
  {
    icon: Truck,
    title: "Delivery Contractor",
    description:
      "Professional delivery contractor services tailored to business transportation requirements.",
    image:
      "/ser2.png",
    href: "/services",
  },
  {
    icon: Boxes,
    title: "Freight Transportation",
    description: "Dependable local and long-distance transportation solutions.",
    image:
      "/ser3.png",
    href: "/services",
  },
  {
    icon: Route,
    title: "Logistics Support",
    description:
      "Transportation coordination and logistics assistance for commercial operations.",
    image:
      "/ser4.png",
    href: "/services",
  },
  {
    icon: ShieldCheck,
    title: "Timely & Secure Delivery",
    description: "Safety-focused delivery designed around dependable schedules.",
    image:
      "/ser5.png",
    href: "/services",
  },
];

export default function ServicesPreview() {
  return (
    <section className="bg-bg py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            label="What We Offer"
            heading="Reliable Transportation Services"
            description="Flexible transportation solutions designed to keep your business moving."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
