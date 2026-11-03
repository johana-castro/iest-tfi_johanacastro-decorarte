
export default function AdminStatCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-neutral-950">
            {value}
          </p>
          {description && (
            <p className="mt-2 text-xs text-neutral-400">
              {description}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-xl text-amber-700">
          {icon}
        </div>
      </div>
    </article>
  );
}
