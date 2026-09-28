"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail, Clock, Menu, X, Facebook, Instagram, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { telHref } from "@/lib/phone";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Booking" },
];

const DEFAULT_SETTINGS = {
  phone: "+1 475 208-1499",
  email: "arrivesafelyllc@gmail.com",
  trustMessage: "Trusted Transportation & Delivery Solutions",
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
};

export default function Header({ settings = DEFAULT_SETTINGS }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 w-full ${scrolled ? "shadow-lg" : ""}`}>
      {/* Top info bar */}
      <div className="hidden bg-deep-navy text-white/80 md:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href={telHref(settings.phone)} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} /> {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={13} /> {settings.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden lg:inline">{settings.trustMessage}</span>
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Clock size={13} /> 24/7 Support
            </span>
            <div className="flex items-center gap-3 border-l border-white/15 pl-4">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={14} className="hover:text-brand-red transition-colors cursor-pointer" />
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={14} className="hover:text-brand-red transition-colors cursor-pointer" />
                </a>
              )}
              {settings.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={14} className="hover:text-brand-red transition-colors cursor-pointer" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white">
        <nav className="container-page flex h-20 items-center justify-between" aria-label="Main navigation">
          <Logo />
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-heading text-sm font-semibold uppercase tracking-wide text-deep-navy transition-colors hover:text-brand-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <Link href="/contact" className="btn-red inline-block rounded-sm px-6 py-3 text-sm">
              Contact Us
            </Link>
          </div>

          <button
            className="flex items-center justify-center rounded-sm p-2 text-navy lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-deep-navy p-6">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                className="rounded-sm p-2 text-white"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-heading text-2xl font-semibold uppercase tracking-wide text-white transition-colors hover:text-brand-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="btn-red block rounded-sm px-6 py-3 text-center text-sm"
              >
                Book Now
              </Link>
              <a href={telHref(settings.phone)} className="flex items-center justify-center gap-2 text-white/80">
                <Phone size={16} /> {settings.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
