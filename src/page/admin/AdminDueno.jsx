import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FiUserPlus, FiUser, FiMail, FiShield, FiRefreshCw,
  FiEdit2, FiTrash2, FiLock, FiUnlock, FiAlertCircle,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { duenoService } from '../../services/dueno.service';

export default function AdminDueno({ compacto = false }) {
  const queryClient = useQueryClient();
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const duenoQuery = useQuery({
    queryKey: ['dueno'],
    queryFn: () => duenoService.obtener(),
    retry: false,
  });

  useEffect(() => {
    if (duenoQuery.data) setNombre(duenoQuery.data.nombre_completo || '');
  }, [duenoQuery.data]);

  const refrescar = async () => {
    await queryClient.invalidateQueries({ queryKey: ['dueno'] });
  };

  const crearMutation = useMutation({
    mutationFn: () => duenoService.crear({
      nombre_completo: nombre.trim(),
      email: email.trim(),
      password,
    }),
    onSuccess: async () => {
      toast.success('La cuenta del dueño fue creada.');
      setEmail(''); setPassword(''); setNombre('');
      await refrescar();
    },
    onError: (error) => toast.error(error.message || 'No se pudo crear la cuenta.'),
  });

  const editarMutation = useMutation({
    mutationFn: () => duenoService.actualizar(nombre.trim()),
    onSuccess: async () => {
      toast.success('Los datos del dueño fueron actualizados.');
      setModoEdicion(false);
      await refrescar();
    },
    onError: (error) => toast.error(error.message || 'No se pudo actualizar el dueño.'),
  });

  const accionMutation = useMutation({
    mutationFn: (accion) => duenoService.ejecutarAccion(accion),
    onSuccess: async (_data, accion) => {
      const mensajes = {
        suspender: 'La cuenta del dueño fue suspendida.',
        activar: 'La cuenta del dueño fue reactivada.',
        eliminar: 'La cuenta del dueño fue eliminada.',
      };
      toast.success(mensajes[accion] || 'Operación completada.');
      setModoEdicion(false);
      setNombre('');
      await refrescar();
    },
    onError: (error) => toast.error(error.message || 'No se pudo completar la operación.'),
  });

  const dueno = duenoQuery.data;
  const ocupado = crearMutation.isPending || editarMutation.isPending || accionMutation.isPending;

  function crearCuenta(event) {
    event.preventDefault();
    if (nombre.trim().length < 3) return toast.error('El nombre debe tener al menos 3 caracteres.');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return toast.error('Ingresá un correo válido.');
    if (password.length < 6) return toast.error('La contraseña debe tener al menos 6 caracteres.');
    crearMutation.mutate();
  }

  function guardarEdicion(event) {
    event.preventDefault();
    if (nombre.trim().length < 3) return toast.error('El nombre debe tener al menos 3 caracteres.');
    editarMutation.mutate();
  }

  function confirmarAccion(accion) {
    const textos = {
      suspender: 'El dueño perderá el acceso al panel hasta que lo reactives.',
      activar: 'El dueño volverá a tener acceso al panel.',
      eliminar: 'Se eliminará permanentemente su usuario de Auth y su perfil. Esta acción no se puede deshacer.',
    };
    Swal.fire({ title: '¿Confirmás esta acción?', text: textos[accion], icon: accion === 'eliminar' ? 'warning' : 'question', showCancelButton: true, confirmButtonText: 'Confirmar', cancelButtonText: 'Volver', confirmButtonColor: accion === 'eliminar' ? '#b85b76' : '#745B6C', reverseButtons: true }).then((resultado) => { if (resultado.isConfirmed) accionMutation.mutate(accion); });
  }

  return (
    <section className={compacto ? '' : 'px-4 py-6 sm:px-6 lg:px-8'}>
      {!compacto && <AdminPageHeader title="Gestión del dueño" description="Creá y administrá la única cuenta propietaria de DecorArte." />}

      {duenoQuery.isLoading && <div className="rounded-2xl bg-white p-8 text-center text-sm text-neutral-500">Consultando la cuenta del dueño...</div>}
      {duenoQuery.isError && (
        <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <FiAlertCircle className="mt-0.5 shrink-0" size={19} />
          <div><strong>No se pudo consultar la cuenta.</strong><p className="mt-1">{duenoQuery.error?.message}</p><button onClick={() => duenoQuery.refetch()} className="mt-2 font-semibold underline">Reintentar</button></div>
        </div>
      )}

      {!duenoQuery.isLoading && !duenoQuery.isError && !dueno && (
        <form onSubmit={crearCuenta} className="max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><FiUserPlus size={23} /></div>
            <div><h3 className="font-bold text-neutral-900">Crear cuenta del dueño</h3><p className="text-sm text-neutral-500">Todavía no existe una cuenta propietaria.</p></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-neutral-700 sm:col-span-2">Nombre completo<input value={nombre} onChange={(e) => setNombre(e.target.value)} minLength={3} maxLength={100} required className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-amber-500" placeholder="Nombre y apellido" /></label>
            <label className="text-sm font-semibold text-neutral-700">Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-amber-500" placeholder="dueno@correo.com" /></label>
            <label className="text-sm font-semibold text-neutral-700">Contraseña inicial<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-amber-500" placeholder="Mínimo 6 caracteres" /></label>
          </div>
          <p className="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-blue-800"><FiShield className="mr-2 inline" />La cuenta se crea mediante la Edge Function protegida. No se habilita el registro público.</p>
          <button disabled={ocupado} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 font-semibold text-white hover:bg-amber-600 disabled:opacity-50"><FiUserPlus />{crearMutation.isPending ? 'Creando cuenta...' : 'Crear dueño'}</button>
        </form>
      )}

      {!duenoQuery.isLoading && !duenoQuery.isError && dueno && (
        <article className="max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-neutral-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"><FiUser size={26} /></div><div><h3 className="text-lg font-bold text-neutral-900">Cuenta del dueño</h3><span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${dueno.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{dueno.estado === 'activo' ? 'Activa' : 'Suspendida'}</span></div></div>
            <button onClick={() => duenoQuery.refetch()} disabled={duenoQuery.isFetching} className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"><FiRefreshCw className={duenoQuery.isFetching ? 'animate-spin' : ''} />Actualizar</button>
          </div>
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div><p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Nombre completo</p>{modoEdicion ? <input value={nombre} onChange={(e) => setNombre(e.target.value)} minLength={3} maxLength={100} className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 outline-none focus:border-amber-500" /> : <p className="mt-2 font-semibold text-neutral-900">{dueno.nombre_completo}</p>}</div>
            <div><p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Correo electrónico</p><p className="mt-2 flex items-center gap-2 font-medium text-neutral-700"><FiMail className="text-neutral-400" />{dueno.email}</p></div>
            <div><p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Rol</p><p className="mt-2 font-medium text-neutral-700">Dueño</p></div>
            <div><p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Identificador</p><p className="mt-2 break-all font-mono text-xs text-neutral-500">{dueno.id}</p></div>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-neutral-100 bg-neutral-50 p-6">
            {modoEdicion ? <>
              <button onClick={guardarEdicion} disabled={ocupado} className="rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{editarMutation.isPending ? 'Guardando...' : 'Guardar cambios'}</button>
              <button onClick={() => { setModoEdicion(false); setNombre(dueno.nombre_completo); }} className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold">Cancelar</button>
            </> : <>
              <button onClick={() => setModoEdicion(true)} className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:border-amber-400"><FiEdit2 />Editar nombre</button>
              {dueno.estado === 'activo' ? <button onClick={() => confirmarAccion('suspender')} disabled={ocupado} className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-50"><FiLock />Suspender</button> : <button onClick={() => confirmarAccion('activar')} disabled={ocupado} className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50"><FiUnlock />Reactivar</button>}
              <button onClick={() => confirmarAccion('eliminar')} disabled={ocupado} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"><FiTrash2 />Eliminar cuenta</button>
            </>}
          </div>
        </article>
      )}
    </section>
  );
}
