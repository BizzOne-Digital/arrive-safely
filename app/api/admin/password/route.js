import { NextResponse } from "next/server";
import { isAuthed, hashPassword, verifyPassword } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function PATCH(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Current and new password are required" },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 }
    );
  }

  await dbConnect();
  let setting = await Setting.findOne();
  if (!setting) setting = new Setting();

  const currentValid = setting.passwordHash
    ? verifyPassword(currentPassword, setting.passwordHash)
    : currentPassword === process.env.ADMIN_PASSWORD;

  if (!currentValid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  setting.passwordHash = hashPassword(newPassword);
  await setting.save();

  return NextResponse.json({ ok: true });
}
