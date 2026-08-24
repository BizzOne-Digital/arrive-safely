import Link from "next/link";
import { Phone, Mail, Facebook, Instagram, Linkedin, Truck } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Contractor Delivery",
  "Delivery Contractor",
  "Freight Transportation",
  "Logistics Support",
];

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/10">
              <Truck size={20} className="text-white" />
            </span>
            <span className="font-heading text-lg font-bold uppercase text-white">
              Arrive <span className="text-brand-red">Safely</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Reliable trucking and contractor delivery solutions focused on safety,
            professionalism, and dependable service.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 transition-colors hover:border-brand-red hover:text-brand-red"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brand-red">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="tel:7863172798" className="flex items-center gap-2 transition-colors hover:text-brand-red">
                <Phone size={15} /> 786-317-2798
              </a>
            </li>
            <li>
              <a
                href="mailto:arrivesafelyllc@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-brand-red"
              >
                <Mail size={15} /> arrivesafelyllc@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Arrive Safely. All Rights Reserved.</p>
          <p>Designed for safe, dependable transportation.</p>
        </div>
      </div>
    </footer>
  );
}
