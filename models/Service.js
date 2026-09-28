import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, default: "Truck" },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    showOnHome: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
