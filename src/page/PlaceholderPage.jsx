
export default function PlaceholderPage({
  title,
  description = 'Esta sección estará disponible próximamente.',
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-600">
        DecorArte
      </p>

      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>

      <p className="mt-3 max-w-2xl text-gray-600">
        {description}
      </p>
    </section>
  )
}
