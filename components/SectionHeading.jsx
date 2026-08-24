export default function SectionHeading({
  label,
  heading,
  description,
  align = "center",
  light = false,
}) {
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {label && (
        <span className={`eyebrow ${align === "center" ? "" : ""}`}>{label}</span>
      )}
      <h2
        className={`mt-3 max-w-2xl font-heading text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-[2.75rem] ${
          light ? "text-white" : "text-deep-navy"
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
      <span className="mt-5 h-1 w-16 rounded-full bg-brand-red" />
    </div>
  );
}
