import PageSkeleton from '../../components/ui/PageSkeleton';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiPackage, FiBriefcase, FiHelpCircle, FiArrowRight } from 'react-icons/fi';
import AdminStatCard from '../../components/admin/AdminStatCard';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { productosService } from '../../services/productos.service';
import { serviciosService } from '../../services/servicios.service';
import { preguntasService } from '../../services/preguntas.service';

export default function OwnerDashboard() {
  const productos = useQuery({ queryKey: ['productos', 'todos'], queryFn: () => productosService.obtenerTodos() });
  const servicios = useQuery({ queryKey: ['servicios', 'todos'], queryFn: () => serviciosService.obtenerTodos() });
  const preguntas = useQuery({ queryKey: ['preguntas', 'todas'], queryFn: () => preguntasService.obtenerTodos() });
  const loading = productos.isLoading || servicios.isLoading || preguntas.isLoading;
  const error = productos.isError || servicios.isError || preguntas.isError;
  const activos = (items = []) => items.filter((item) => item.activo).length;

  return <section className="px-4 py-6 sm:px-6 lg:px-8">
    <AdminPageHeader eyebrow="Panel de gestión" title="Mi espacio de trabajo" description="Desde acá podés mantener actualizado el catálogo y la información que ve el público." />
    {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">No se pudieron consultar algunos datos. Revisá tu conexión o los permisos de la cuenta.</div>}
    {loading ? <PageSkeleton tipo="dashboard" cantidad={3} /> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <AdminStatCard title="Productos" value={loading ? '—' : productos.data?.length ?? 0} description={loading ? 'Cargando...' : `${activos(productos.data)} publicados`} icon={<FiPackage size={23} />} />
      <AdminStatCard title="Servicios" value={loading ? '—' : servicios.data?.length ?? 0} description={loading ? 'Cargando...' : `${activos(servicios.data)} publicados`} icon={<FiBriefcase size={23} />} />
      <AdminStatCard title="Preguntas frecuentes" value={preguntas.data?.length ?? 0} description={`${activos(preguntas.data)} publicadas`} icon={<FiHelpCircle size={23} />} />
    </div>}
    <h2 className="mb-5 mt-10 text-xl font-bold text-neutral-950">Administrar contenido</h2>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[
        { to: '/dueno/productos', title: 'Mis productos', text: 'Crear, editar, ordenar y publicar productos.', icon: <FiPackage /> },
        { to: '/dueno/servicios', title: 'Mis servicios', text: 'Actualizar los servicios y sus precios.', icon: <FiBriefcase /> },
        { to: '/dueno/preguntas-frecuentes', title: 'Preguntas frecuentes', text: 'Mantener actualizadas las respuestas para visitantes.', icon: <FiHelpCircle /> },
      ].map((item) => <Link key={item.to} to={item.to} className="group flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-amber-400 hover:shadow-md"><div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">{item.icon}</div><div><h3 className="font-bold text-neutral-900">{item.title}</h3><p className="mt-1 text-sm text-neutral-500">{item.text}</p></div></div><FiArrowRight className="shrink-0 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-amber-700" /></Link>)}
    </div>
  </section>;
}
