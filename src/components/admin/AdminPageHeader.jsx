
export default function AdminPageHeader({
  eyebrow = 'Administración',
  title,
  description,
  action,
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-neutral-950">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-neutral-500">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
