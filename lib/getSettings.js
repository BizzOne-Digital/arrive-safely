import { dbConnect } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function getSettings() {
  await dbConnect();
  let doc = await Setting.findOne().lean();

  if (!doc) {
    doc = await Setting.create({});
    doc = doc.toObject();
  }

  return {
    id: doc._id.toString(),
    phone: doc.phone,
    email: doc.email,
    address: doc.address,
    facebookUrl: doc.facebookUrl || "",
    instagramUrl: doc.instagramUrl || "",
    linkedinUrl: doc.linkedinUrl || "",
    trustMessage: doc.trustMessage,
  };
}
