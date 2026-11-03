
import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { supabase } from '../config/supabase'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  const loadProfile = useCallback(async (currentUser) => {
    if (!currentUser) {
      setProfile(null)
      setAuthError(null)
      return null
    }

    const { data, error } = await supabase
      .from('perfiles')
      .select('id, nombre_completo, rol_codigo, estado')
      .eq('id', currentUser.id)
      .maybeSingle()

    if (error) {
      setProfile(null)
      setAuthError(error.message)
      return null
    }

    if (!data) {
      setProfile(null)
      setAuthError('El usuario no tiene un perfil registrado.')
      return null
    }

    setProfile(data)
    setAuthError(null)

    return data
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!user) return null
    return await loadProfile(user)
  }, [user, loadProfile])


const signIn = useCallback(async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      error: 'Correo electrónico o contraseña incorrectos.',
    }
  }

  const currentUser = data.user

  const { data: currentProfile, error: profileError } = await supabase
    .from('perfiles')
    .select('id, nombre_completo, rol_codigo, estado')
    .eq('id', currentUser.id)
    .maybeSingle()

  if (profileError || !currentProfile) {
    await supabase.auth.signOut()

    return {
      success: false,
      error: 'No se encontró un perfil válido para esta cuenta.',
    }
  }

  if (currentProfile.estado !== 'activo') {
    await supabase.auth.signOut()

    return {
      success: false,
      error: 'Esta cuenta se encuentra suspendida.',
    }
  }

  if (!['administrador', 'dueno'].includes(currentProfile.rol_codigo)) {
    await supabase.auth.signOut()

    return {
      success: false,
      error: 'Esta cuenta no tiene un rol autorizado.',
    }
  }

  setUser(currentUser)
  setProfile(currentProfile)
  setAuthError(null)

  return {
    success: true,
    profile: currentProfile,
  }
}, [])


  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    setUser(null)
    setProfile(null)
    setAuthError(null)

    return { success: true }
  }, [])

  useEffect(() => {
    let mounted = true
    let latestRequest = 0

    const syncSession = async (session) => {
      const requestId = ++latestRequest
      const currentUser = session?.user ?? null

      if (!mounted) return

      setUser(currentUser)

      if (!currentUser) {
        setProfile(null)
        setAuthError(null)
        setLoading(false)
        return
      }

      setLoading(true)

      const { data, error } = await supabase
        .from('perfiles')
        .select('id, nombre_completo, rol_codigo, estado')
        .eq('id', currentUser.id)
        .maybeSingle()

      if (!mounted || requestId !== latestRequest) return

      if (error) {
        setProfile(null)
        setAuthError(error.message)
      } else if (!data) {
        setProfile(null)
        setAuthError('El usuario no tiene un perfil registrado.')
      } else if (data.estado !== 'activo') {
        // Una cuenta suspendida no conserva el acceso al panel al rehidratar
        // una sesión que ya estaba abierta en el navegador.
        setProfile(null)
        setUser(null)
        setAuthError('Esta cuenta se encuentra suspendida.')
        await supabase.auth.signOut({ scope: 'local' })
      } else {
        setProfile(data)
        setAuthError(null)
      }

      if (mounted && requestId === latestRequest) setLoading(false)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Evita realizar consultas a Supabase dentro del callback de auth.
      Promise.resolve().then(() => syncSession(session))
    })

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return

      if (error) {
        setAuthError(error.message)
        setLoading(false)
        return
      }

      syncSession(data.session)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const isAuthenticated = Boolean(user)
  const isActive = profile?.estado === 'activo'

  const isAdmin =
    isActive && profile?.rol_codigo === 'administrador'

  const isDueno =
    isActive && profile?.rol_codigo === 'dueno'

  const value = {
    user,
    profile,
    loading,
    authError,
    isAuthenticated,
    isActive,
    isAdmin,
    isDueno,
    signIn,
    signOut,
    refreshProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
