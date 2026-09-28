import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";
import { isAuthed } from "@/lib/auth";
import { deleteUploadIfLocal } from "@/lib/deleteUpload";

export async function PATCH(request, ctx) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await dbConnect();
  const data = await request.json();

  const existing = await Service.findById(id);
  if (!existing) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const previousImage = existing.image;

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

  if (previousImage && previousImage !== data.image) {
    await deleteUploadIfLocal(previousImage);
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

  await deleteUploadIfLocal(service.image);

  return NextResponse.json({ ok: true });
}
