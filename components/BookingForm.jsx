"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-sm text-deep-navy placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 transition-colors";
const labelClass = "mb-1.5 block font-heading text-xs font-semibold uppercase tracking-wide text-deep-navy";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-14 text-center">
        <CheckCircle2 className="text-brand-red" size={48} />
        <h2 className="mt-4 font-heading text-2xl font-bold uppercase text-deep-navy">
          Request Received
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thank you for submitting your delivery request. Our team will contact
          you shortly to confirm availability and service details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-slate-200 bg-white p-8 sm:p-10">
      <h2 className="font-heading text-xl font-bold uppercase text-deep-navy">
        Delivery Request Details
      </h2>
      <span className="mt-2 block h-1 w-10 bg-brand-red" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" required className={inputClass} placeholder="John Smith" />
        </div>
        <div>
          <label className={labelClass} htmlFor="companyName">Company Name</label>
          <input id="companyName" name="companyName" className={inputClass} placeholder="ABC Contracting LLC" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="(786) 000-0000" />
        </div>
        <div>
          <label className={labelClass} htmlFor="pickupLocation">Pickup Location</label>
          <input id="pickupLocation" name="pickupLocation" required className={inputClass} placeholder="Pickup address or city" />
        </div>
        <div>
          <label className={labelClass} htmlFor="deliveryLocation">Delivery Location</label>
          <input id="deliveryLocation" name="deliveryLocation" required className={inputClass} placeholder="Delivery address or city" />
        </div>
        <div>
          <label className={labelClass} htmlFor="deliveryDate">Preferred Delivery Date</label>
          <input id="deliveryDate" name="deliveryDate" type="date" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="deliveryTime">Preferred Time</label>
          <input id="deliveryTime" name="deliveryTime" type="time" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="serviceType">Service Type</label>
          <select id="serviceType" name="serviceType" required className={inputClass}>
            <option value="">Select a service</option>
            <option>Contractor Delivery</option>
            <option>Delivery Contractor</option>
            <option>Freight Transportation</option>
            <option>Local Delivery</option>
            <option>Long-Distance Delivery</option>
            <option>Logistics Support</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="contactMethod">Preferred Contact Method</label>
          <select id="contactMethod" name="contactMethod" className={inputClass}>
            <option>Phone Call</option>
            <option>Email</option>
            <option>Text Message</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClass} htmlFor="cargoDescription">Cargo / Delivery Description</label>
        <textarea id="cargoDescription" name="cargoDescription" rows={3} className={inputClass} placeholder="Describe what needs to be delivered" />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="loadDetails">Estimated Load Details</label>
          <input id="loadDetails" name="loadDetails" className={inputClass} placeholder="Weight, dimensions, quantity" />
        </div>
        <div>
          <label className={labelClass} htmlFor="specialInstructions">Special Instructions</label>
          <input id="specialInstructions" name="specialInstructions" className={inputClass} placeholder="Gate codes, access notes, etc." />
        </div>
      </div>

      <button type="submit" className="btn-red mt-8 inline-flex items-center gap-2 rounded-sm px-9 py-4 text-sm">
        Submit Delivery Request <Send size={16} />
      </button>
    </form>
  );
}
