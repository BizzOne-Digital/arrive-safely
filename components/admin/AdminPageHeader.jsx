export default function AdminPageHeader({ title, description, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-6">
      <div>
        <h1 className="font-heading text-2xl font-bold uppercase text-deep-navy">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
