
import { FiArrowRight, FiBriefcase, FiAlertCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useServicios } from '../../hook/useServicios';
import PageHeader from '../../components/public/PageHeader';
import { storageService } from '../../services/storage.service';
import { useMemo, useState } from 'react';

import { CATEGORIAS_SERVICIOS, filtrarServicios } from '../../utils/categoriasServicios';
import PageSkeleton from '../../components/ui/PageSkeleton';
export default function ServiciosPage() {
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const {
    data: servicios = [],
    isLoading,
    isError,
    error,
  } = useServicios(true);

  const filtrados = useMemo(() => filtrarServicios(servicios, categoria, busqueda), [servicios, categoria, busqueda]);
  return (
    <main className="min-h-screen">
      <PageHeader
        etiqueta="Propuestas personalizadas"
        titulo="Nuestros servicios"
        descripcion=""
        imagen="/media/hero-servicios.jpg"

      />

      <section className="section-container py-section">
        <div className="services-toolbar">
          <div className="category-chips" aria-label="Filtrar servicios">{CATEGORIAS_SERVICIOS.map((item) => <button key={item} onClick={() => setCategoria(item)} className={categoria === item ? 'category-chip selected' : 'category-chip'}>{item}</button>)}</div>
          <label className="service-search"><FiSearch/><input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar un servicio..." aria-label="Buscar servicios"/></label>
        </div>
        <div className="mb-9">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
            ¿Qué podemos hacer?
          </p>
          <h2 className="mt-2 text-3xl font-bold text-neutral-900">
            Servicios de DecorArte
          </h2>
        </div>

        {isLoading && (
          <PageSkeleton tipo="cards" cantidad={6} />
        )}

        {isError && (
          <div className="rounded-2xl bg-red-50 p-6 text-red-700">
            <FiAlertCircle className="mb-2" size={25} />
            No pudimos cargar los servicios: {error?.message}
          </div>
        )}

        {!isLoading && !isError && filtrados.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <FiBriefcase className="mx-auto mb-4 text-neutral-300" size={40} />
            <h3 className="font-bold text-neutral-800">
              Estamos preparando nuestros servicios.
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              Muy pronto vas a encontrar nuestras propuestas.
            </p>
          </div>
        )}

        {!isLoading && !isError && filtrados.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((servicio) => (
              <article
                key={servicio.id}
                className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl bg-amber-50 text-amber-700">
                  {servicio.imagen_ruta ? (
                    <img
                      src={storageService.obtenerUrlPublica(servicio.imagen_ruta)}
                      alt={servicio.nombre}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <FiBriefcase size={34} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-neutral-900">
                  {servicio.nombre}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                  {servicio.descripcion}
                </p>

                <div className="mt-6 border-t border-neutral-100 pt-5">
                  {servicio.precio_desde !== null &&
                  servicio.precio_desde !== undefined ? (
                    <p className="font-bold text-amber-700">
                      Desde{' '}
                      {new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: servicio.moneda || 'ARS',
                      }).format(Number(servicio.precio_desde))}
                    </p>
                  ) : (
                    <p className="font-semibold text-amber-700">
                      Presupuesto personalizado
                    </p>
                  )}

                  <Link
                    to={`/contacto?servicio=${encodeURIComponent(servicio.nombre)}#presupuesto`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-neutral-800 transition group-hover:text-amber-700"
                  >
                    Consultar servicio <FiArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-neutral-950 px-5 py-14 text-center text-white">
        <h2 className="text-2xl font-bold md:text-3xl">
          ¿No encontrás lo que estás buscando?
        </h2>
        <p className="mt-3 text-neutral-300">
          Contanos tu idea. Podemos evaluar una propuesta personalizada.
        </p>
        <Link
          to="/contacto"
          className="mt-7 inline-block rounded-xl bg-amber-500 px-6 py-3 font-bold text-neutral-950 hover:bg-amber-400"
        >
          Contactar
        </Link>
      </section>
    </main>
  );
}
