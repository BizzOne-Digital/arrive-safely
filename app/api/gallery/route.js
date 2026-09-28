import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const images = await GalleryImage.find().sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json({ images });
}

export async function POST(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const data = await request.json();

  if (!data.label || !data.image) {
    return NextResponse.json(
      { error: "Label and image are required" },
      { status: 400 }
    );
  }

  const image = await GalleryImage.create({
    label: data.label,
    image: data.image,
    order: Number(data.order) || 0,
  });

  return NextResponse.json({ image }, { status: 201 });
}
