import { MessageSquare, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { dbConnect } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

const placeholders = [1, 2, 3];

export default async function Testimonials() {
  await dbConnect();
  const testimonials = await Testimonial.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();

  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            label="Client Feedback"
            heading="Trusted Service. Professional Delivery."
            description={
              testimonials.length === 0
                ? "Client testimonials will be featured here as they are collected."
                : undefined
            }
          />
        </Reveal>

        {testimonials.length === 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholders.map((n, i) => (
              <Reveal key={n} delay={i * 100}>
                <div className="flex h-full flex-col rounded-sm border border-dashed border-slate-300 bg-bg p-7">
                  <MessageSquare className="text-navy/40" size={28} />
                  <p className="mt-4 flex-1 text-sm italic leading-relaxed text-muted">
                    Testimonial content will be added here once client feedback is
                    available for this placement.
                  </p>
                  <div className="mt-5 border-t border-slate-200 pt-3">
                    <p className="font-heading text-sm font-bold uppercase text-deep-navy/50">
                      Client Name — Company
                    </p>
                    <p className="text-xs uppercase tracking-wide text-muted/70">
                      Placeholder — Editable Content
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t._id.toString()} delay={i * 100}>
                <div className="flex h-full flex-col rounded-sm border border-slate-200 bg-bg p-7">
                  <Quote className="text-brand-red" size={28} />
                  <p className="mt-4 flex-1 text-sm italic leading-relaxed text-muted">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 border-t border-slate-200 pt-3">
                    <p className="font-heading text-sm font-bold uppercase text-deep-navy">
                      {t.name}
                      {t.company ? ` — ${t.company}` : ""}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
