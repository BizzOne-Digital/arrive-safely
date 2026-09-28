import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { isAuthed } from "@/lib/auth";

export async function GET(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ leads });
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  const lead = await Lead.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    subject: data.subject,
    message: data.message,
  });

  return NextResponse.json({ lead }, { status: 201 });
}
