import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { isAuthed } from "@/lib/auth";

export async function GET(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ bookings });
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();

  const required = [
    "fullName",
    "email",
    "phone",
    "pickupLocation",
    "deliveryLocation",
    "deliveryDate",
    "serviceType",
  ];
  const missing = required.filter((field) => !data[field]);

  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const booking = await Booking.create({
    fullName: data.fullName,
    companyName: data.companyName,
    email: data.email,
    phone: data.phone,
    pickupLocation: data.pickupLocation,
    deliveryLocation: data.deliveryLocation,
    deliveryDate: data.deliveryDate,
    deliveryTime: data.deliveryTime,
    serviceType: data.serviceType,
    contactMethod: data.contactMethod,
    cargoDescription: data.cargoDescription,
    loadDetails: data.loadDetails,
    specialInstructions: data.specialInstructions,
  });

  return NextResponse.json({ booking }, { status: 201 });
}
