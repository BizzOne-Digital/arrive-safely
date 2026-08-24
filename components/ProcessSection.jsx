import { PackageCheck, CalendarDays, Truck, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    icon: PackageCheck,
    title: "Contact Us",
    text: "Tell us about your transportation or delivery requirement.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Schedule Service",
    text: "Choose the required date and service details.",
  },
  {
    number: "03",
    icon: Truck,
    title: "We Handle the Delivery",
    text: "Our team coordinates safe and professional transportation.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Arrive Safely",
    text: "Your delivery reaches its destination securely and professionally.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-bg py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            label="Our Process"
            heading="Simple. Reliable. Professional."
          />
        </Reveal>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <span className="route-line absolute left-1/2 top-8 hidden w-[calc(100%+2.5rem)] lg:block" />
                )}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white shadow-lg">
                  <step.icon size={26} />
                </div>
                <span className="mt-4 font-heading text-3xl font-extrabold text-brand-red/30">
                  {step.number}
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold uppercase text-deep-navy">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[13rem] text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
