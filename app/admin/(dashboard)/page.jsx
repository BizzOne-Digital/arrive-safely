import Link from "next/link";
import { Users, CalendarDays, Wrench, Quote, Images, ArrowRight } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { dbConnect } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Booking from "@/models/Booking";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import GalleryImage from "@/models/GalleryImage";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  await dbConnect();

  const [
    leadsCount,
    newLeadsCount,
    bookingsCount,
    pendingBookingsCount,
    servicesCount,
    testimonialsCount,
    galleryCount,
    recentLeads,
    recentBookings,
  ] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: "new" }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: "pending" }),
    Service.countDocuments(),
    Testimonial.countDocuments(),
    GalleryImage.countDocuments(),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
    Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const stats = [
    {
      label: "Total Leads",
      value: leadsCount,
      sub: `${newLeadsCount} new`,
      icon: Users,
      href: "/admin/leads",
    },
    {
      label: "Total Bookings",
      value: bookingsCount,
      sub: `${pendingBookingsCount} pending`,
      icon: CalendarDays,
      href: "/admin/bookings",
    },
    {
      label: "Services",
      value: servicesCount,
      sub: "Published",
      icon: Wrench,
      href: "/admin/services",
    },
    {
      label: "Testimonials",
      value: testimonialsCount,
      sub: "Total",
      icon: Quote,
      href: "/admin/testimonials",
    },
    {
      label: "Gallery Images",
      value: galleryCount,
      sub: "Total",
      icon: Images,
      href: "/admin/gallery",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of leads, bookings, and site content."
      />

      <main className="container-page py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map(({ label, value, sub, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-sm border border-slate-200 bg-white p-6 transition-colors hover:border-navy"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy/10 text-navy">
                <Icon size={20} />
              </span>
              <p className="mt-4 font-heading text-3xl font-bold text-deep-navy">{value}</p>
              <p className="mt-1 text-sm font-semibold text-deep-navy">{label}</p>
              <p className="text-xs text-muted">{sub}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-sm border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="font-heading text-sm font-bold uppercase text-deep-navy">
                Recent Leads
              </h2>
              <Link href="/admin/leads" className="flex items-center gap-1 text-xs font-semibold uppercase text-navy hover:text-brand-red">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {recentLeads.length === 0 ? (
              <p className="p-6 text-sm text-muted">No leads yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <li key={lead._id} className="px-6 py-4">
                    <p className="font-medium text-deep-navy">{lead.name}</p>
                    <p className="text-sm text-muted">{lead.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-sm border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="font-heading text-sm font-bold uppercase text-deep-navy">
                Recent Bookings
              </h2>
              <Link href="/admin/bookings" className="flex items-center gap-1 text-xs font-semibold uppercase text-navy hover:text-brand-red">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {recentBookings.length === 0 ? (
              <p className="p-6 text-sm text-muted">No bookings yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {recentBookings.map((booking) => (
                  <li key={booking._id} className="px-6 py-4">
                    <p className="font-medium text-deep-navy">{booking.fullName}</p>
                    <p className="text-sm text-muted">
                      {booking.pickupLocation} → {booking.deliveryLocation}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
