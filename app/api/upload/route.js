import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { isAuthed } from "@/lib/auth";
import { UPLOAD_FOLDERS, ALLOWED_MIME_TYPES, MAX_UPLOAD_SIZE } from "@/lib/uploadFolders";

export const runtime = "nodejs";

export async function POST(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!UPLOAD_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  const ext = ALLOWED_MIME_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPEG, PNG, WEBP, or GIF." },
      { status: 400 }
    );
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    return NextResponse.json(
      { error: "File is too large. Maximum size is 8MB." },
      { status: 400 }
    );
  }

  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await dbConnect();
  await StoredUpload.create({
    folder,
    filename,
    mimeType: file.type,
    size: file.size,
    data: buffer,
  });

  return NextResponse.json({
    success: true,
    url: `/api/uploads/${folder}/${filename}`,
    filename,
    size: file.size,
    folder,
  });
}
