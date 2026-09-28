import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    companyName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    deliveryLocation: { type: String, required: true },
    deliveryDate: { type: String, required: true },
    deliveryTime: { type: String },
    serviceType: { type: String, required: true },
    contactMethod: { type: String },
    cargoDescription: { type: String },
    loadDetails: { type: String },
    specialInstructions: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
