
import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFFAF7] px-5 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-7 flex justify-center"><img src="/marca/logo-decorarte.webp" alt="DecorArte" className="h-24 w-56 object-contain" /></Link>

        <div className="rounded-2xl border border-[#eee4e5] bg-white p-7 shadow-[0_14px_38px_rgba(78,50,61,.08)]">
          <Outlet />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Acceso privado de administración
        </p>
      </div>
    </main>
  )
}
