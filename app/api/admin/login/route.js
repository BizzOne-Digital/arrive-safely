import { NextResponse } from "next/server";
import { createSessionToken, verifyPassword, COOKIE_NAME, MAX_AGE_SECONDS } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function POST(request) {
  const { password } = await request.json();

  await dbConnect();
  const setting = await Setting.findOne();

  const valid = setting?.passwordHash
    ? verifyPassword(password, setting.passwordHash)
    : password === process.env.ADMIN_PASSWORD;

  if (!process.env.ADMIN_PASSWORD && !setting?.passwordHash) {
    return NextResponse.json(
      { error: "Admin password is not configured" },
      { status: 500 }
    );
  }

  if (!valid) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return res;
}
