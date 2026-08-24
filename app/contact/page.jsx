import { Phone, Mail, Headset } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contact Arrive Safely for trucking, contractor delivery, and logistics support. Call 786-317-2798 or send us a message.",
};

const cards = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["786-317-2798"],
    href: "tel:7863172798",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["arrivesafelyllc@gmail.com"],
    href: "mailto:arrivesafelyllc@gmail.com",
  },
  {
    icon: Headset,
    title: "Service Support",
    lines: [
      "Transportation scheduling, delivery timelines,",
      "contractor coordination, and customer support.",
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        heading="Let's Get Your Delivery Moving"
        description="Reach out to discuss your transportation, contractor delivery, or logistics needs."
        image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000&auto=format&fit=crop"
        alt="Logistics coordinator planning customer support and delivery scheduling"
      />

      <section className="bg-bg py-20">
        <div className="container-page grid gap-6 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, lines, href }) => (
            <div key={title} className="rounded-sm border border-slate-200 bg-white p-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-heading text-base font-bold uppercase text-deep-navy">
                {title}
              </h3>
              <div className="mt-2 text-sm leading-relaxed text-muted">
                {href ? (
                  <a href={href} className="transition-colors hover:text-brand-red">
                    {lines[0]}
                  </a>
                ) : (
                  lines.map((l) => <p key={l}>{l}</p>)
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="container-page mt-14">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
