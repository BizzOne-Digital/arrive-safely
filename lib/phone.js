export function telHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
