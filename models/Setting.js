import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    phone: { type: String, default: "+1 475 208-1499" },
    email: { type: String, default: "arrivesafelyllc@gmail.com" },
    address: { type: String, default: "390 Shelton Ave, Shelton, CT 06484" },
    facebookUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    trustMessage: {
      type: String,
      default: "Trusted Transportation & Delivery Solutions",
    },
    passwordHash: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
