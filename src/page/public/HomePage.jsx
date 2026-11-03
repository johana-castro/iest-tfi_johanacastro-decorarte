
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart, FiGift, FiStar } from 'react-icons/fi';

import { useProductos } from '../../hook/useProductos';
import { useServicios } from '../../hook/useServicios';
import { storageService } from '../../services/storage.service';
import WhatsAppButton from '../../components/public/WhatsAppButton';
import PageSkeleton from '../../components/ui/PageSkeleton';

export default function HomePage() {
  const { data: productos = [], isLoading: cargandoProductos } =
    useProductos(true);

  const { data: servicios = [], isLoading: cargandoServicios } =
    useServicios(true);

  const destacados = productos
    .filter((producto) => producto.destacado)
    .slice(0, 3);

  const productosMostrar = destacados.length
    ? destacados
    : productos.slice(0, 3);

  return (
    <main className="bg-stone-50">
      {/* HERO */}
      <section className="home-hero relative overflow-hidden bg-neutral-950 px-5 py-24 text-white md:py-36">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              Decoración y artesanías
            </span>

            <h1 className="mt-7 text-5xl font-bold leading-tight md:text-7xl">
              Pequeños detalles,
              <span className="block text-amber-400">
                grandes momentos.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">
              Creamos piezas artesanales y propuestas de decoración
              personalizadas para acompañar tus momentos especiales.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-4 font-bold text-neutral-950 transition hover:bg-amber-400"
              >
                Explorar catálogo
                <FiArrowRight />
              </Link>

              <Link
                to="/contacto#presupuesto"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Solicitar presupuesto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:grid-cols-3">
        {[
          {
            icon: <FiHeart size={25} />,
            titulo: 'Hecho con dedicación',
            texto: 'Cada creación está pensada para cuidar los detalles.',
          },
          {
            icon: <FiGift size={25} />,
            titulo: 'Personalización',
            texto: 'Adaptamos nuestras propuestas a cada ocasión.',
          },
          {
            icon: <FiStar size={25} />,
            titulo: 'Creaciones únicas',
            texto: 'Ideas artesanales para regalar, decorar y celebrar.',
          },
        ].map((item) => (
          <article
            key={item.titulo}
            className="rounded-2xl border border-stone-200 bg-white p-7 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              {item.icon}
            </div>

            <h2 className="font-bold text-neutral-900">{item.titulo}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              {item.texto}
            </p>
          </article>
        ))}
      </section>

      {/* PRODUCTOS */}
      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
                Nuestras creaciones
              </p>
              <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                Productos destacados
              </h2>
            </div>

            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 font-semibold text-amber-700 hover:text-amber-900"
            >
              Ver catálogo <FiArrowRight />
            </Link>
          </div>

          {cargandoProductos ? (
            <PageSkeleton tipo="cards" cantidad={3} />
          ) : productosMostrar.length === 0 ? (
            <p className="rounded-2xl bg-stone-50 p-10 text-center text-neutral-500">
              Estamos preparando nuestras próximas creaciones.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productosMostrar.map((producto) => (
                <article
                  key={producto.id}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50"
                >
                  <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-amber-50 text-amber-800/40">{producto.imagen_ruta ? <img src={storageService.obtenerUrlPublica(producto.imagen_ruta)} alt={producto.nombre} loading="lazy" className="h-full w-full object-cover"/> : <FiGift size={45} />}</div>

                  <div className="p-5">
                    <h3 className="font-bold text-neutral-900">
                      {producto.nombre}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                      {producto.descripcion}
                    </p>

                    <Link
                      to="/contacto#presupuesto"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700"
                    >
                      Consultar <FiArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
            Creamos para vos
          </p>
          <h2 className="mt-2 text-3xl font-bold text-neutral-900">
            Nuestros servicios
          </h2>
        </div>

        {cargandoServicios ? (
          <PageSkeleton tipo="cards" cantidad={3} />
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.slice(0, 3).map((servicio) => (
              <article
                key={servicio.id}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-neutral-900">
                  {servicio.nombre}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {servicio.descripcion}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-9 text-center">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 rounded-xl border border-[#814d65] bg-[#e0abbf] px-6 py-3 font-semibold text-white transition hover:bg-[#b7859d]"
          >
            Conocer todos los servicios <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="home-idea-cta px-5 py-20 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          ¿Tenés una idea en mente?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-neutral-300">
          Contanos qué necesitás y preparemos juntos una propuesta.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contacto#presupuesto"
            className="rounded-xl bg-amber-500 px-6 py-3 font-bold text-neutral-950 hover:bg-amber-400"
          >
            Pedir presupuesto
          </Link>

          <WhatsAppButton />
        </div>
      </section>
    </main>
  );
}
