import Image from "next/image";

export default function PageHero({ eyebrow, heading, description, image, alt }) {
  return (
    <section className="relative flex h-[52vh] min-h-[380px] items-center overflow-hidden bg-deep-navy">
      <Image src={image} alt={alt} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 via-deep-navy/80 to-deep-navy/40" />
      <div className="container-page relative z-10">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-3 max-w-2xl font-heading text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl md:text-6xl">
          {heading}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
