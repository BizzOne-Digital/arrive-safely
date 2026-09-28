import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Setting from "@/models/Setting";
import { isAuthed } from "@/lib/auth";
import { getSettings } from "@/lib/getSettings";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const data = await request.json();

  let doc = await Setting.findOne();
  if (!doc) doc = new Setting();

  doc.phone = data.phone ?? doc.phone;
  doc.email = data.email ?? doc.email;
  doc.address = data.address ?? doc.address;
  doc.facebookUrl = data.facebookUrl ?? doc.facebookUrl;
  doc.instagramUrl = data.instagramUrl ?? doc.instagramUrl;
  doc.linkedinUrl = data.linkedinUrl ?? doc.linkedinUrl;
  doc.trustMessage = data.trustMessage ?? doc.trustMessage;

  await doc.save();

  return NextResponse.json({ settings: doc });
}
