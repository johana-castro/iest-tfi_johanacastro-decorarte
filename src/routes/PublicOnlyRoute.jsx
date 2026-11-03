
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'

export default function PublicOnlyRoute() {
  const {
    user,
    profile,
    loading,
    isActive,
  } = useAuth()

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Verificando sesión...</p>
      </main>
    )
  }

  if (!user) return <Outlet />

  if (!profile || !isActive) {
    return <Navigate to="/acceso-denegado" replace />
  }

  if (profile.rol_codigo === 'administrador') {
    return <Navigate to="/admin" replace />
  }

  if (profile.rol_codigo === 'dueno') {
    return <Navigate to="/dueno" replace />
  }

  return <Navigate to="/acceso-denegado" replace />
}
