import { dbConnect } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { UPLOAD_FOLDERS } from "@/lib/uploadFolders";

export const runtime = "nodejs";

function isSafeSegment(value) {
  return typeof value === "string" && value.length > 0 && !value.includes("..") && !value.includes("/");
}

export async function GET(request, ctx) {
  const { folder, filename } = await ctx.params;

  if (!UPLOAD_FOLDERS.includes(folder) || !isSafeSegment(filename)) {
    return new Response("Not found", { status: 404 });
  }

  await dbConnect();
  const doc = await StoredUpload.findOne({ folder, filename }).lean();

  if (!doc) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(doc.data, {
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(doc.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
