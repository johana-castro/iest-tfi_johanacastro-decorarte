
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'

function LoadingScreen() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-500">
        Verificando acceso...
      </p>
    </main>
  )
}

export default function ProtectedRoute({ allowedRoles = [] }) {
  const {
    user,
    profile,
    loading,
    authError,
    isActive,
  } = useAuth()

  if (loading) return <LoadingScreen />

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (authError || !profile) {
    return <Navigate to="/acceso-denegado" replace />
  }

  if (!isActive) {
    return <Navigate to="/acceso-denegado" replace />
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(profile.rol_codigo)
  ) {
    if (profile.rol_codigo === 'administrador') {
      return <Navigate to="/admin" replace />
    }

    if (profile.rol_codigo === 'dueno') {
      return <Navigate to="/dueno" replace />
    }

    return <Navigate to="/acceso-denegado" replace />
  }

  return <Outlet />
}
