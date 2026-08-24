"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-sm text-deep-navy placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 transition-colors";
const labelClass = "mb-1.5 block font-heading text-xs font-semibold uppercase tracking-wide text-deep-navy";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-14 text-center">
        <CheckCircle2 className="text-brand-red" size={48} />
        <h2 className="mt-4 font-heading text-2xl font-bold uppercase text-deep-navy">
          Message Sent
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thank you for reaching out. A member of our team will respond to
          your message shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-sm border border-slate-200 bg-white p-8 sm:p-10">
      <h2 className="font-heading text-xl font-bold uppercase text-deep-navy">
        Send Us a Message
      </h2>
      <span className="mt-2 block h-1 w-10 bg-brand-red" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Name</label>
          <input id="name" name="name" required className={inputClass} placeholder="Your full name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="(786) 000-0000" />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">Company</label>
          <input id="company" name="company" className={inputClass} placeholder="Company name" />
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClass} htmlFor="subject">Subject</label>
        <input id="subject" name="subject" required className={inputClass} placeholder="What is this about?" />
      </div>

      <div className="mt-6">
        <label className={labelClass} htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required className={inputClass} placeholder="Tell us how we can help" />
      </div>

      <button type="submit" className="btn-red mt-8 inline-flex items-center gap-2 rounded-sm px-9 py-4 text-sm">
        Send Message <Send size={16} />
      </button>
    </form>
  );
}
