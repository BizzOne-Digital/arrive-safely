import { ShieldCheck, Clock, Users, Truck } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { icon: Truck, label: "Reliable Transportation" },
  { icon: Users, label: "Professional Service" },
  { icon: ShieldCheck, label: "Safety Focused" },
  { icon: Clock, label: "On-Time Commitment" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-slate-200 bg-white py-16">
      <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map(({ icon: Icon, label }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                <Icon size={26} />
              </span>
              <p className="mt-3 font-heading text-sm font-bold uppercase tracking-wide text-deep-navy">
                {label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
