import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { isAuthed } from "@/lib/auth";

export async function PATCH(request, ctx) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await dbConnect();
  const data = await request.json();

  const booking = await Booking.findByIdAndUpdate(
    id,
    { status: data.status },
    { new: true, runValidators: true }
  );

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ booking });
}

export async function DELETE(request, ctx) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await dbConnect();
  const booking = await Booking.findByIdAndDelete(id);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
