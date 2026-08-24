import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Truck, Headset } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, title: "100% Reliability", text: "Your cargo is in safe hands." },
  { icon: Truck, title: "Safe Delivery", text: "We protect every load like our own." },
  { icon: Clock, title: "On-Time Service", text: "Your deadlines matter." },
  { icon: Headset, title: "Professional Support", text: "Reliable communication, pickup to delivery." },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-deep-navy">
      <div className="relative h-[92vh] min-h-[640px] w-full sm:h-[88vh]">
        <Image
          src="/hero.png"
          alt="Semi truck driving on an open interstate highway at sunset"
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-deep-navy/85 to-deep-navy/10" />
        <div className="absolute inset-0 bg-grid-texture bg-[size:48px_48px] opacity-40" />

        <div className="container-page relative z-10 flex h-full flex-col justify-center pb-40 pt-24 sm:pb-48">
          <span className="eyebrow">On Time. Every Time.</span>
          <h1 className="mt-4 font-heading text-6xl font-extrabold uppercase leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Arrive<br />
            <span className="text-brand-red">Safely</span>
          </h1>
          <p className="mt-5 max-w-lg font-heading text-xl font-semibold uppercase tracking-wide text-white/90 sm:text-2xl">
            Reliable Trucking &amp; Delivery Solutions
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            We deliver more than cargo — we deliver peace of mind. Dependable
            transportation solutions for contractors and businesses with safety,
            professionalism, and on-time service at the heart of every delivery.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/services" className="btn-red inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm">
              Our Services <ArrowRight size={16} />
            </Link>
            <Link href="/booking" className="btn-outline inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm">
              Book Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Floating trust panel */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-page pb-8 sm:pb-10">
            <div className="grid grid-cols-2 gap-4 rounded-sm border border-white/10 bg-deep-navy/70 p-6 backdrop-blur-md sm:grid-cols-4 sm:gap-6">
              {trustItems.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-brand-red/15 text-brand-red">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold uppercase text-white">{title}</p>
                    <p className="mt-1 text-xs leading-snug text-white/60">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
