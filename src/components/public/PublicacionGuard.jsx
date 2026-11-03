import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../config/supabase';

async function consultarPublicacion() {
  const { data, error } = await supabase
    .from('configuracion_sitio')
    .select('sitio_activo, mensaje_bloqueo')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data;
}

export default function PublicacionGuard() {
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['configuracion-sitio', 'publico'],
    queryFn: consultarPublicacion,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 15000,
    retry: 1,
  });

  if (isPending) {
    return <main className="flex min-h-screen items-center justify-center" role="status">Verificando disponibilidad de DecorArte...</main>;
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rose-50 px-5">
        <section className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-rose-950">No se pudo verificar el estado del sitio</h1>
          <p className="mt-4 text-neutral-600">Por favor, intentá nuevamente.</p>
          <button type="button" onClick={() => refetch()} disabled={isFetching} className="mt-6 rounded-xl bg-rose-900 px-6 py-3 font-semibold text-white disabled:opacity-50">
            {isFetching ? 'Comprobando...' : 'Reintentar'}
          </button>
        </section>
      </main>
    );
  }

  if (data.sitio_activo !== true) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rose-50 px-5">
        <section className="w-full max-w-xl rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-lg sm:p-12">
          <img src="/marca/icono-decorarte.webp" alt="DecorArte" className="mx-auto mb-6 h-20 w-20 object-contain" />
          <h1 className="text-3xl font-bold text-rose-950">Sitio temporalmente no disponible</h1>
          <p className="mt-5 leading-relaxed text-neutral-600">{data.mensaje_bloqueo || 'El sitio se encuentra temporalmente fuera de servicio.'}</p>
          <p className="mt-6 text-sm text-neutral-400">Gracias por tu comprensión.</p>
        </section>
      </main>
    );
  }

  return <Outlet />;
}
