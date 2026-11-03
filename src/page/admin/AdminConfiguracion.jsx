import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FiGlobe, FiSave, FiAlertTriangle, FiUsers, FiInfo } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { supabase } from '../../config/supabase';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminDueno from './AdminDueno';
import PageSkeleton from '../../components/ui/PageSkeleton';

async function obtenerConfiguracion() {
  const { data, error } = await supabase.from('configuracion_sitio')
    .select('id, sitio_activo, mensaje_bloqueo').eq('id', 1).single();
  if (error) throw error;
  return data;
}

async function guardarConfiguracion(datos) {
  const { data, error } = await supabase.from('configuracion_sitio')
    .update({ sitio_activo: datos.sitio_activo, mensaje_bloqueo: datos.mensaje_bloqueo })
    .eq('id', 1).select('id, sitio_activo, mensaje_bloqueo').single();
  if (error) throw error;
  return data;
}

export default function AdminConfiguracion() {
  const queryClient = useQueryClient();
  const [activo, setActivo] = useState(true);
  const [mensaje, setMensaje] = useState('El sitio se encuentra temporalmente fuera de servicio.');
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['configuracion-sitio'], queryFn: obtenerConfiguracion });

  useEffect(() => {
    if (data) { setActivo(data.sitio_activo); setMensaje(data.mensaje_bloqueo || ''); }
  }, [data]);

  const mutation = useMutation({
    mutationFn: guardarConfiguracion,
    onSuccess: (resultado) => { queryClient.setQueryData(['configuracion-sitio'], resultado); toast.success('Configuración del sitio actualizada.'); },
    onError: (err) => toast.error(err.message || 'No se pudo guardar la configuración.'),
  });

  function guardar(event) {
    event.preventDefault();
    if (!activo && !mensaje.trim()) return toast.error('Ingresá el mensaje que verá el público.');
    mutation.mutate({ sitio_activo: activo, mensaje_bloqueo: mensaje.trim() });
  }

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <AdminPageHeader title="Configuración" description="Controlá la publicación del sitio y administrá la cuenta propietaria de DecorArte." />
      <div className="mb-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <form onSubmit={guardar} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><FiGlobe size={23} /></div><div><h2 className="font-bold text-neutral-900">Publicación del sitio</h2><p className="text-sm text-neutral-500">Visibilidad del sitio público.</p></div></div>
          {isLoading && <PageSkeleton tipo="faq" cantidad={3} />}
          {isError && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">No se pudo obtener la configuración: {error?.message}</div>}
          {!isLoading && !isError && data && <>
            <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-neutral-200 p-4"><input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} className="mt-1 h-5 w-5 accent-amber-600" /><span><strong className="block text-neutral-900">Sitio publicado</strong><span className="mt-1 block text-sm text-neutral-500">{activo ? 'Los visitantes pueden acceder al contenido público.' : 'El público verá el mensaje de sitio fuera de servicio.'}</span></span></label>
            {!activo && <div className="mt-4 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800"><FiAlertTriangle className="mt-0.5 shrink-0" size={19} /><p>El administrador conserva el acceso al panel. El dueño no podrá gestionar el catálogo mientras el sitio esté deshabilitado.</p></div>}
            <label className="mt-5 block text-sm font-semibold text-neutral-700">Mensaje para los visitantes<textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} maxLength={500} rows={3} className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-amber-500" placeholder="El sitio se encuentra temporalmente fuera de servicio." /></label>
            <p className="mt-1 text-right text-xs text-neutral-400">{mensaje.length}/500</p>
            <button type="submit" disabled={mutation.isPending} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 font-bold text-white hover:bg-amber-600 disabled:opacity-50"><FiSave />{mutation.isPending ? 'Guardando...' : 'Guardar configuración'}</button>
          </>}
        </form>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><FiInfo size={22} /></div><div><h2 className="font-bold text-neutral-900">Estado de publicación</h2><p className="text-sm text-neutral-500">Resumen de cómo se comporta el sitio.</p></div></div>
          <div className={`rounded-xl p-5 ${activo ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-900'}`}><p className="text-xs font-bold uppercase tracking-wide">Estado actual</p><p className="mt-1 text-2xl font-bold">{activo ? 'Publicado' : 'No publicado'}</p><p className="mt-2 text-sm">{activo ? 'El catálogo y las páginas públicas están habilitados.' : 'El contenido público está bloqueado hasta volver a publicar el sitio.'}</p></div>
          <p className="mt-5 text-sm leading-relaxed text-neutral-500">Este apartado administra exclusivamente la disponibilidad técnica del sitio. Los datos comerciales, la identidad visual y la información de contacto se gestionarán en el futuro módulo Perfil del negocio, con su propia tabla <code>informacion_negocio</code>.</p>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><FiUsers size={22} /></div><div><h2 className="text-xl font-bold text-neutral-950">Gestión del dueño</h2><p className="text-sm text-neutral-500">Creación, edición, suspensión, reactivación y eliminación de la cuenta propietaria.</p></div></div>
      <AdminDueno compacto />
    </section>
  );
}
