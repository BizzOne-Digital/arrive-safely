import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { isAuthed } from "@/lib/auth";

export async function GET(request) {
  await dbConnect();
  const query = isAuthed(request) ? {} : { published: true };
  const testimonials = await Testimonial.find(query)
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ testimonials });
}

export async function POST(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const data = await request.json();

  if (!data.name || !data.quote) {
    return NextResponse.json(
      { error: "Name and quote are required" },
      { status: 400 }
    );
  }

  const testimonial = await Testimonial.create({
    name: data.name,
    company: data.company,
    quote: data.quote,
    published: data.published !== false,
    order: Number(data.order) || 0,
  });

  return NextResponse.json({ testimonial }, { status: 201 });
}
