
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'
import { toast } from 'react-toastify'

import { loginSchema } from '../../features/auth/login.schema'
import { useAuth } from '../../hook/useAuth'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [intentos, setIntentos] = useState(() => { try { return JSON.parse(localStorage.getItem('decorarte-login-lock') || '{}'); } catch { return {}; } })
  const [segundos, setSegundos] = useState(0)
  const bloqueado = Number(intentos.hasta || 0) > Date.now()
  useEffect(() => {
    if (!bloqueado) { setSegundos(0); return undefined; }
    const actualizar = () => setSegundos(Math.max(0, Math.ceil((Number(intentos.hasta) - Date.now()) / 1000)));
    actualizar(); const id = window.setInterval(actualizar, 1000);
    return () => window.clearInterval(id);
  }, [bloqueado, intentos.hasta])

  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values) => {
    if (bloqueado) { toast.warning(`Demasiados intentos. Volvé a probar en ${segundos} segundos.`); return; }
    setSubmitting(true)

    try {
      const result = await signIn(
        values.email,
        values.password
      )

      if (!result.success) {
        const nuevos = Number(intentos.cantidad || 0) + 1;
        const estado = nuevos >= 3 ? { cantidad: 0, hasta: Date.now() + 60_000 } : { cantidad: nuevos, hasta: 0 };
        setIntentos(estado); localStorage.setItem('decorarte-login-lock', JSON.stringify(estado));
        toast.error(nuevos >= 3 ? 'Se alcanzaron 3 intentos fallidos. El acceso se pausa durante 60 segundos.' : `${result.error} (${nuevos}/3 intentos)`);
        return
      }
      setIntentos({ cantidad: 0, hasta: 0 }); localStorage.removeItem('decorarte-login-lock')

      toast.success('¡Bienvenido a DecorArte!')

      if (result.profile.rol_codigo === 'administrador') {
        navigate('/admin', { replace: true })
      } else if (result.profile.rol_codigo === 'dueno') {
        navigate('/dueno', { replace: true })
      }
    } catch (error) {
      toast.error('No se pudo iniciar sesión. Intentá nuevamente.')
      console.error('Error de inicio de sesión:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section>
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <FiLock size={25} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Iniciar sesión
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Ingresá para administrar DecorArte.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {bloqueado && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">Por seguridad, el formulario se habilitará en {segundos} segundos.</p>}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="correo@ejemplo.com"
              {...register('email')}
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Tu contraseña"
              {...register('password')}
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-12 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || bloqueado}
          className="flex w-full items-center justify-center rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {bloqueado ? `Reintentar en ${segundos}s` : submitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </section>
  )
}
