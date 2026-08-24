import { Phone, Mail, ShieldCheck, CalendarDays, Headset } from "lucide-react";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Booking",
  description:
    "Schedule your delivery with Arrive Safely. Submit your transportation requirements and our team will confirm availability.",
};

const sidebarPoints = [
  { icon: ShieldCheck, text: "Safe handling of every load" },
  { icon: CalendarDays, text: "Reliable scheduling" },
  { icon: Headset, text: "Professional support" },
];

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Delivery"
        heading="Schedule Your Delivery"
        description="Tell us about your transportation requirement and our team will contact you to confirm availability and service details."
        image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000&auto=format&fit=crop"
        alt="Logistics coordinator planning a scheduled delivery"
      />

      <section className="bg-bg py-20">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-sm border border-slate-200 bg-white p-8">
              <h3 className="font-heading text-lg font-bold uppercase text-deep-navy">
                Need Immediate Assistance?
              </h3>
              <span className="mt-2 block h-1 w-10 bg-brand-red" />
              <div className="mt-5 space-y-4 text-sm">
                <a
                  href="tel:7863172798"
                  className="flex items-center gap-3 text-deep-navy transition-colors hover:text-brand-red"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy/10 text-navy">
                    <Phone size={18} />
                  </span>
                  786-317-2798
                </a>
                <a
                  href="mailto:arrivesafelyllc@gmail.com"
                  className="flex items-center gap-3 text-deep-navy transition-colors hover:text-brand-red"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy/10 text-navy">
                    <Mail size={18} />
                  </span>
                  arrivesafelyllc@gmail.com
                </a>
              </div>
            </div>

            <div className="rounded-sm bg-navy p-8 text-white">
              <ul className="space-y-4">
                {sidebarPoints.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm bg-white/10 text-brand-red">
                      <Icon size={17} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
