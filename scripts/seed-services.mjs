import mongoose from "mongoose";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", ".env.local") });

const ServiceSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    icon: String,
    image: String,
    order: Number,
    showOnHome: Boolean,
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const seedData = [
  {
    title: "Contractor Delivery",
    description:
      "Reliable delivery support for contractors, construction teams, and commercial projects.",
    icon: "Package",
    image: "/ser1.png",
    order: 1,
    showOnHome: true,
  },
  {
    title: "Delivery Contractor",
    description:
      "Professional delivery contractor services tailored to business transportation requirements.",
    icon: "Truck",
    image: "/ser2.png",
    order: 2,
    showOnHome: true,
  },
  {
    title: "Freight Transportation",
    description: "Dependable local and long-distance transportation solutions.",
    icon: "Boxes",
    image: "/ser3.png",
    order: 3,
    showOnHome: true,
  },
  {
    title: "Logistics Support",
    description:
      "Transportation coordination and logistics assistance for commercial operations.",
    icon: "Route",
    image: "/ser4.png",
    order: 4,
    showOnHome: true,
  },
  {
    title: "Timely & Secure Delivery",
    description: "Safety-focused delivery designed around dependable schedules.",
    icon: "ShieldCheck",
    image: "/ser5.png",
    order: 5,
    showOnHome: true,
  },
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI in .env.local");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const count = await Service.countDocuments();
  if (count > 0) {
    console.log(`Services collection already has ${count} document(s). Skipping seed.`);
    await mongoose.disconnect();
    return;
  }

  await Service.insertMany(seedData);
  console.log(`Seeded ${seedData.length} services.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
