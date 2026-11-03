import { supabase } from '../config/supabase'

const BUCKET = 'catalogo'
const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
])
const CARPETAS_VALIDAS = new Set(['productos', 'servicios'])

function obtenerExtension(file) {
  const extensionPorMime = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/avif': 'avif',
  }
  return extensionPorMime[file.type]
}

export const storageService = {
  async subirImagen(file, carpeta) {
    if (!(file instanceof File)) throw new Error('Seleccioná una imagen válida.')
    if (!ALLOWED_TYPES.has(file.type)) {
      throw new Error('Formato no permitido. Usá JPG, PNG, WebP o AVIF.')
    }
    if (file.size > MAX_SIZE) throw new Error('La imagen supera el límite de 5 MB.')
    if (!CARPETAS_VALIDAS.has(carpeta)) throw new Error('Carpeta de destino no válida.')

    const ruta = `${carpeta}/${crypto.randomUUID()}.${obtenerExtension(file)}`
    const { data, error } = await supabase.storage.from(BUCKET).upload(ruta, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })
    if (error) throw error
    return data.path
  },

  obtenerUrlPublica(ruta) {
    if (!ruta) return null
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta)
    return data.publicUrl
  },

  async eliminarImagen(ruta) {
    if (!ruta) return true
    // Evita que un valor arbitrario termine borrando objetos fuera de las carpetas del catálogo.
    if (!/^(productos|servicios)\/[\w.-]+$/.test(ruta)) {
      throw new Error('La ruta de imagen no pertenece al catálogo.')
    }
    const { error } = await supabase.storage.from(BUCKET).remove([ruta])
    if (error) throw error
    return true
  },
}
