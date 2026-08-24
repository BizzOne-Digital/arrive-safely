import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ icon: Icon, title, description, image, href }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {image && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-navy/10 text-navy">
          <Icon size={24} strokeWidth={2} />
        </span>
        <h3 className="font-heading text-lg font-bold uppercase text-deep-navy">{title}</h3>
        <span className="mt-2 h-[3px] w-10 bg-brand-red" />
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{description}</p>
        {href && (
          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase text-navy transition-colors group-hover:text-brand-red"
          >
            Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
