import {
  Package,
  Truck,
  Boxes,
  Route,
  ClipboardList,
  CalendarDays,
  ShieldCheck,
  MapPin,
  Warehouse,
  Handshake,
} from "lucide-react";

export const SERVICE_ICONS = {
  Package,
  Truck,
  Boxes,
  Route,
  ClipboardList,
  CalendarDays,
  ShieldCheck,
  MapPin,
  Warehouse,
  Handshake,
};

export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS);

export function getServiceIcon(name) {
  return SERVICE_ICONS[name] || Truck;
}
