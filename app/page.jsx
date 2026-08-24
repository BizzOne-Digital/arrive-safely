import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import ServicesPreview from "@/components/ServicesPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";
import BookingCTA from "@/components/BookingCTA";

export const metadata = {
  title: "Arrive Safely | Trucking & Contractor Delivery Services",
  description:
    "Professional trucking, contractor delivery, freight transportation, and logistics support from Arrive Safely.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <StatsSection />
      <ProcessSection />
      <CTASection
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2000&auto=format&fit=crop"
        heading="Need a Dependable Delivery Contractor?"
        description="Partner with Arrive Safely for reliable transportation solutions designed around your business and project requirements."
      />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
