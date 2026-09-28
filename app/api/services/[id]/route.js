import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

function isAuthed(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function PATCH(request, ctx) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await dbConnect();
  const data = await request.json();

  const service = await Service.findByIdAndUpdate(
    id,
    {
      title: data.title,
      description: data.description,
      icon: data.icon,
      image: data.image,
      order: Number(data.order) || 0,
      showOnHome: data.showOnHome !== false,
    },
    { new: true, runValidators: true }
  );

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({ service });
}

export async function DELETE(request, ctx) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await dbConnect();
  const service = await Service.findByIdAndDelete(id);

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
