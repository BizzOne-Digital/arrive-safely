import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

function isAuthed(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  await dbConnect();
  const services = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json({ services });
}

export async function POST(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const data = await request.json();

  if (!data.title || !data.description || !data.image) {
    return NextResponse.json(
      { error: "Title, description, and image are required" },
      { status: 400 }
    );
  }

  const service = await Service.create({
    title: data.title,
    description: data.description,
    icon: data.icon || "Truck",
    image: data.image,
    order: Number(data.order) || 0,
    showOnHome: data.showOnHome !== false,
  });

  return NextResponse.json({ service }, { status: 201 });
}
