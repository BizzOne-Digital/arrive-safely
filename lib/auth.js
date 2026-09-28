import crypto from "crypto";

const COOKIE_NAME = "as_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET environment variable");
  return secret;
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `admin.${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, expires, signature] = parts;
  const payload = `${role}.${expires}`;
  const expected = sign(payload);
  if (expected.length !== signature.length) return false;
  const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!valid) return false;
  return Date.now() < Number(expires);
}

export { COOKIE_NAME, MAX_AGE_SECONDS };
