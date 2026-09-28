import { dbConnect } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";

const UPLOAD_PREFIX = "/api/uploads/";

export async function deleteUploadIfLocal(url) {
  if (!url || !url.startsWith(UPLOAD_PREFIX)) return;

  const [folder, filename] = url.slice(UPLOAD_PREFIX.length).split("/");
  if (!folder || !filename) return;

  await dbConnect();
  await StoredUpload.deleteOne({ folder, filename });
}
