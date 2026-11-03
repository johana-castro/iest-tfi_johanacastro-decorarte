
import { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { usePreguntasFrecuentes } from '../../hook/usePreguntasFrecuentes';
import PageHeader from '../../components/public/PageHeader';
import PageSkeleton from '../../components/ui/PageSkeleton';

export default function PreguntasFrecuentesPage() {
  const [abierta, setAbierta] = useState(null);

  const {
    data: preguntas = [],
    isLoading,
    isError,
    error,
  } = usePreguntasFrecuentes(true);

  return (
    <main className="min-h-screen bg-stone-50">
      <PageHeader
        etiqueta="Estamos para ayudarte"
        titulo="Preguntas frecuentes"
        descripcion="Encontrá respuestas a las consultas más habituales sobre nuestros productos y servicios."
      />

      <section className="mx-auto max-w-4xl px-5 py-16">
        {isLoading && (
          <PageSkeleton tipo="faq" cantidad={5} />
        )}

        {isError && (
          <div className="rounded-xl bg-red-50 p-5 text-red-700">
            No pudimos cargar las preguntas: {error?.message}
          </div>
        )}

        {!isLoading && !isError && preguntas.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <FiHelpCircle className="mx-auto mb-4 text-neutral-300" size={42} />
            <h2 className="font-bold text-neutral-800">
              Todavía no hay preguntas publicadas.
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Si tenés alguna duda, podés comunicarte con nosotros.
            </p>
          </div>
        )}

        {!isLoading && !isError && preguntas.length > 0 && (
          <div className="space-y-4">
            {preguntas.map((item) => {
              const estaAbierta = abierta === item.id;

              return (
                <article
                  key={item.id}
                  className="faq-item overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setAbierta(estaAbierta ? null : item.id)
                    }
                    aria-expanded={estaAbierta}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                  >
                    <span className="font-semibold text-neutral-900">
                      {item.pregunta}
                    </span>

                    <FiChevronDown
                      className={`shrink-0 text-amber-700 transition-transform ${
                        estaAbierta ? 'rotate-180' : ''
                      }`}
                      size={22}
                    />
                  </button>

                  {estaAbierta && (
                    <div className="border-t border-stone-100 px-5 py-5 text-sm leading-relaxed text-neutral-600 md:px-6">
                      {item.respuesta}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-rose-200 bg-[#f2dce7] p-8 text-center">
          <h2 className="text-xl font-bold text-neutral-900">
            ¿No encontraste tu respuesta?
          </h2>

          <p className="mt-2 text-sm text-neutral-600">
            Estamos disponibles para ayudarte con tu consulta.
          </p>

          <Link
            to="/contacto"
            className="mt-5 inline-block rounded-xl bg-[#713450] px-6 py-3 font-semibold !text-white hover:bg-[#54263c]"
          >
            Contactanos
          </Link>
        </div>
      </section>
    </main>
  );
}
