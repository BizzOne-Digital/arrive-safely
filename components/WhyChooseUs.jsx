import { ShieldCheck, Clock, Headset, Handshake, BadgeCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const features = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    text: "Every delivery is handled with responsibility and attention.",
  },
  {
    icon: Clock,
    title: "On-Time Commitment",
    text: "We respect schedules and understand that deadlines matter.",
  },
  {
    icon: Headset,
    title: "Professional Service",
    text: "Dependable communication from start to finish.",
  },
  {
    icon: Handshake,
    title: "Contractor Focused",
    text: "Transportation support designed around commercial and contractor needs.",
  },
  {
    icon: BadgeCheck,
    title: "Reliable Support",
    text: "Stay informed throughout the delivery process.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-deep-navy py-24">
      <div className="absolute inset-0 bg-grid-texture bg-[size:44px_44px] opacity-30" />
      <div className="container-page relative z-10">
        <Reveal>
          <SectionHeading
            label="Why Arrive Safely"
            heading="Built Around Safety, Reliability & Service"
            light
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="h-full rounded-sm border border-white/10 bg-white/5 p-6 transition-colors hover:border-brand-red/60 hover:bg-white/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-brand-red/15 text-brand-red">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold uppercase text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
