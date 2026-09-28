import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { telHref } from "@/lib/phone";
import { getServices } from "@/lib/getServices";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

const DEFAULT_SETTINGS = {
  phone: "+1 475 208-1499",
  email: "arrivesafelyllc@gmail.com",
  address: "390 Shelton Ave, Shelton, CT 06484",
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
};

export default async function Footer({ settings = DEFAULT_SETTINGS }) {
  const services = await getServices({ homeOnly: true });
  const socialLinks = [
    { Icon: Facebook, url: settings.facebookUrl, label: "Facebook" },
    { Icon: Instagram, url: settings.instagramUrl, label: "Instagram" },
    { Icon: Linkedin, url: settings.linkedinUrl, label: "LinkedIn" },
  ].filter((s) => s.url);

  return (
    <footer className="bg-deep-navy text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center">
              <Image src="/logo.png" alt="Arrive Safely logo" fill className="object-contain" sizes="44px" />
            </span>
            <span className="font-heading text-lg font-bold uppercase text-white">
              Arrive <span className="text-brand-red">Safely</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Reliable trucking and contractor delivery solutions focused on safety,
            professionalism, and dependable service.
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            We also handle contract delivery work for companies and
            corporations — including Amazon, Walmart, and more.
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
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
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={telHref(settings.phone)} className="flex items-center gap-2 transition-colors hover:text-brand-red">
                <Phone size={15} /> {settings.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 transition-colors hover:text-brand-red"
              >
                <Mail size={15} /> {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 flex-shrink-0" />
              <span>{settings.address}</span>
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
