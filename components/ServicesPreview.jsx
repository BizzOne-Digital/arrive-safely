import ServiceCard from "./ServiceCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { getServiceIcon } from "@/lib/serviceIcons";
import { getServices } from "@/lib/getServices";

export default async function ServicesPreview() {
  const services = await getServices({ homeOnly: true });

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
            <Reveal key={s.id} delay={i * 100}>
              <ServiceCard
                icon={getServiceIcon(s.icon)}
                title={s.title}
                description={s.description}
                image={s.image}
                href="/services"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
