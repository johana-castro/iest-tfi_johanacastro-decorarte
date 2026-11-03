
import { Link } from 'react-router-dom'

export default function AccessDenied() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">
        Acceso no disponible
      </h1>

      <p className="mt-3 max-w-md text-gray-500">
        Tu cuenta no tiene un perfil válido o se encuentra suspendida.
        Si creés que se trata de un error, contactá al administrador.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-white"
      >
        Ir al inicio
      </Link>
    </main>
  )
}
