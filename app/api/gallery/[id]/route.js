import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { isAuthed } from "@/lib/auth";
import { deleteUploadIfLocal } from "@/lib/deleteUpload";

export async function DELETE(request, ctx) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  await dbConnect();
  const image = await GalleryImage.findByIdAndDelete(id);

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  await deleteUploadIfLocal(image.image);

  return NextResponse.json({ ok: true });
}
