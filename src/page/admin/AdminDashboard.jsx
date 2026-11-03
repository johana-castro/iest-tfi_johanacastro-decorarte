import PageSkeleton from '../../components/ui/PageSkeleton';

import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  FiPackage,
  FiBriefcase,
  FiHelpCircle,
  FiArrowRight,
  FiActivity,
} from 'react-icons/fi';

import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminStatCard from '../../components/admin/AdminStatCard';

import { productosService } from '../../services/productos.service';
import { serviciosService } from '../../services/servicios.service';
import { preguntasService } from '../../services/preguntas.service';

export default function AdminDashboard() {
  const productos = useQuery({
    queryKey: ['productos', 'todos'],
    queryFn: () => productosService.obtenerTodos(),
  });

  const servicios = useQuery({
    queryKey: ['servicios', 'todos'],
    queryFn: () => serviciosService.obtenerTodos(),
  });

  const preguntas = useQuery({
    queryKey: ['preguntas', 'todas'],
    queryFn: () => preguntasService.obtenerTodos(),
  });

  const cargando =
    productos.isLoading || servicios.isLoading || preguntas.isLoading;

  const error =
    productos.isError || servicios.isError || preguntas.isError;

  const totalActivos = (lista = []) =>
    lista.filter((item) => item.activo).length;

  return (
    <section>
      <AdminPageHeader
        eyebrow="Panel de control"
        title="Dashboard"
        description="Resumen general de la administración de DecorArte."
      />

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          No se pudieron consultar todos los datos. Revisá los permisos y la conexión con Supabase.
        </div>
      )}

      {cargando ? <PageSkeleton tipo="dashboard" cantidad={3} /> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard
          title="Productos"
          value={cargando ? '—' : productos.data?.length ?? 0}
          description={
            cargando
              ? 'Cargando...'
              : `${totalActivos(productos.data)} publicados`
          }
          icon={<FiPackage size={23} />}
        />

        <AdminStatCard
          title="Servicios"
          value={cargando ? '—' : servicios.data?.length ?? 0}
          description={
            cargando
              ? 'Cargando...'
              : `${totalActivos(servicios.data)} publicados`
          }
          icon={<FiBriefcase size={23} />}
        />

        <AdminStatCard
          title="Preguntas frecuentes"
          value={cargando ? '—' : preguntas.data?.length ?? 0}
          description={
            cargando
              ? 'Cargando...'
              : `${totalActivos(preguntas.data)} publicadas`
          }
          icon={<FiHelpCircle size={23} />}
        />
      </div>}

      <div className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-neutral-950">
          Accesos rápidos
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              to: '/admin/productos',
              title: 'Administrar productos',
              text: 'Crear, modificar y publicar productos.',
              icon: <FiPackage />,
            },
            {
              to: '/admin/servicios',
              title: 'Administrar servicios',
              text: 'Gestionar las propuestas de DecorArte.',
              icon: <FiBriefcase />,
            },
            {
              to: '/admin/preguntas-frecuentes',
              title: 'Preguntas frecuentes',
              text: 'Actualizar la información para los visitantes.',
              icon: <FiHelpCircle />,
            },
            {
              to: '/admin/configuracion',
              title: 'Configuración del sitio',
              text: 'Controlar el estado de publicación del sitio.',
              icon: <FiActivity />,
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-amber-400 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {item.text}
                  </p>
                </div>
              </div>

              <FiArrowRight className="shrink-0 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-amber-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
