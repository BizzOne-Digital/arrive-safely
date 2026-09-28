import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { isAuthed } from "@/lib/auth";

export async function PATCH(request, ctx) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await dbConnect();
  const data = await request.json();

  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    {
      name: data.name,
      company: data.company,
      quote: data.quote,
      published: data.published !== false,
      order: Number(data.order) || 0,
    },
    { new: true, runValidators: true }
  );

  if (!testimonial) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  return NextResponse.json({ testimonial });
}

export async function DELETE(request, ctx) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await dbConnect();
  const testimonial = await Testimonial.findByIdAndDelete(id);

  if (!testimonial) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
