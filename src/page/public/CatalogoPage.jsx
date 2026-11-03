
import { useMemo, useState } from 'react';
import { FiSearch, FiImage, FiStar, FiAlertCircle } from 'react-icons/fi';

import { useProductos } from '../../hook/useProductos';
import { storageService } from '../../services/storage.service';
import { useCarrito } from '../../contexts/CarritoContext';
import { FiShoppingBag } from 'react-icons/fi';
import PageHeader from '../../components/public/PageHeader';

function formatearPrecio(precio, moneda = 'ARS') {
  if (precio === null || precio === undefined) {
    return null;
  }

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: moneda || 'ARS',
    maximumFractionDigits: 2,
  }).format(Number(precio));
}

function ProductoCard({ producto }) {
  const { agregar } = useCarrito();
  const precio = formatearPrecio(producto.precio, producto.moneda);

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-stone-100 to-orange-100">
        {producto.imagen_ruta ? (
          <img
            src={storageService.obtenerUrlPublica(producto.imagen_ruta)}
            alt={producto.nombre}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-amber-800/50">
            <FiImage size={48} />
            <span className="text-xs font-medium uppercase tracking-widest">DecorArte</span>
          </div>
        )}

        {producto.destacado && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow">
            <FiStar size={12} />
            Destacado
          </span>
        )}
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-lg font-semibold text-neutral-900 transition group-hover:text-amber-700">
          {producto.nombre}
        </h2>

        <p className="min-h-12 text-sm leading-relaxed text-neutral-600">
          {producto.descripcion || 'Consultanos por más detalles de este producto.'}
        </p>

        <div className="border-t border-neutral-100 pt-3">
          {precio !== null ? (
            <p className="text-lg font-bold text-amber-700">{precio}</p>
          ) : (
            <p className="text-sm font-semibold text-amber-700">
              Consultar precio
            </p>
          )}
        </div>
        <button type="button" onClick={() => agregar(producto)} className="product-add-button"><FiShoppingBag/> Agregar al pedido</button>
      </div>
    </article>
  );
}

export default function CatalogoPage() {
  const [busqueda, setBusqueda] = useState('');

  const {
    data: productos = [],
    isLoading,
    isError,
    error,
  } = useProductos(true);

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    if (!termino) return productos;

    return productos.filter((producto) => {
      const nombre = producto.nombre?.toLowerCase() || '';
      const descripcion = producto.descripcion?.toLowerCase() || '';

      return (
        nombre.includes(termino) ||
        descripcion.includes(termino)
      );
    });
  }, [productos, busqueda]);

  return (
    <main className="min-h-screen">
     <PageHeader
             etiqueta="Detalles unicos"
             titulo="Productos"
             descripcion="Encontrá respuestas a las consultas más habituales sobre nuestros productos y servicios."
             imagen="/media/hero-productos.jpg"
           />

      <section className="section-container py-section">
        <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">
              Nuestras creaciones
            </p>
            <h2 className="section-title">
              Productos disponibles
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              {productosFiltrados.length} de {productos.length} productos publicados
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />

            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
              >
                <div className="aspect-[4/3] animate-pulse bg-neutral-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <FiAlertCircle className="mx-auto mb-3 text-red-600" size={32} />
            <h3 className="font-semibold text-red-800">
              No pudimos cargar el catálogo
            </h3>
            <p className="mt-2 text-sm text-red-700">
              {error?.message || 'Ocurrió un error al consultar los productos.'}
            </p>
          </div>
        )}

        {!isLoading && !isError && productosFiltrados.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-5 py-16 text-center">
            <FiImage className="mx-auto mb-4 text-neutral-300" size={42} />

            <h3 className="text-lg font-semibold text-neutral-800">
              {busqueda
                ? 'No encontramos productos'
                : 'Todavía no hay productos publicados'}
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              {busqueda
                ? 'Probá con otro nombre o término de búsqueda.'
                : 'Pronto vas a encontrar nuestras nuevas creaciones.'}
            </p>
          </div>
        )}

        {!isLoading && !isError && productosFiltrados.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productosFiltrados.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
