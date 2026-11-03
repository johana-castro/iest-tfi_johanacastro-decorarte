import { FiUser, FiMail, FiShield, FiInfo } from 'react-icons/fi';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { useAuth } from '../../hook/useAuth';

export default function OwnerCuenta() {
  const { user, profile } = useAuth();
  return <section className="px-4 py-6 sm:px-6 lg:px-8">
    <AdminPageHeader title="Mi cuenta" description="Información de tu cuenta y nivel de acceso en DecorArte." />
    <div className="max-w-2xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center gap-4 border-b border-neutral-100 p-6"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"><FiUser size={26} /></div><div><h2 className="text-lg font-bold text-neutral-900">{profile?.nombre_completo || 'Dueño'}</h2><span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Cuenta activa</span></div></div>
      <div className="space-y-5 p-6"><div><p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Correo electrónico</p><p className="mt-2 flex items-center gap-2 font-medium text-neutral-800"><FiMail className="text-neutral-400" />{user?.email || 'No disponible'}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Rol</p><p className="mt-2 flex items-center gap-2 font-medium text-neutral-800"><FiShield className="text-neutral-400" />Dueño</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Identificador</p><p className="mt-2 break-all font-mono text-xs text-neutral-500">{profile?.id}</p></div></div>
      <div className="flex gap-3 border-t border-blue-100 bg-blue-50 p-5 text-sm leading-relaxed text-blue-800"><FiInfo className="mt-0.5 shrink-0" size={19} /><p>Los datos de acceso y el estado de tu cuenta son administrados por el administrador del sitio. Si necesitás modificar tu correo o contraseña, solicitá el cambio al administrador.</p></div>
    </div>
  </section>;
}
