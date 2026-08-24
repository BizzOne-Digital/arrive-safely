import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function CTASection({
  image,
  heading,
  description,
  primaryHref = "/booking",
  primaryLabel = "Request Service",
}) {
  return (
    <section className="relative overflow-hidden py-24">
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 via-deep-navy/85 to-deep-navy/60" />
      <div className="container-page relative z-10">
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryHref} className="btn-red inline-block rounded-sm px-8 py-4 text-sm">
              {primaryLabel}
            </Link>
            <a
              href="tel:7863172798"
              className="btn-outline inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm"
            >
              <Phone size={16} /> Call 786-317-2798
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
