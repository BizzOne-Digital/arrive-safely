import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";

export async function getServices({ homeOnly = false } = {}) {
  await dbConnect();
  const query = homeOnly ? { showOnHome: true } : {};
  const services = await Service.find(query).sort({ order: 1, createdAt: 1 }).lean();

  return services.map((s) => ({
    id: s._id.toString(),
    title: s.title,
    description: s.description,
    icon: s.icon,
    image: s.image,
    order: s.order,
    showOnHome: s.showOnHome,
  }));
}
