
import { supabase } from '../config/supabase'

const TABLE = 'productos'

export const productosService = {
  // Productos visibles en la tienda
  async obtenerPublicos() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })
      .order('nombre', { ascending: true })

    if (error) throw error

    return data
  },

  // Todos los productos para administración
  async obtenerTodos() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('orden', { ascending: true })
      .order('creado_en', { ascending: false })

    if (error) throw error

    return data
  },

  // Obtener producto por ID
  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return data
  },

  // Crear producto
  async crear(producto) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(producto)
      .select()
      .single()

    if (error) throw error

    return data
  },

  // Actualizar producto
  async actualizar(id, cambios) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(cambios)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return data
  },

  // Eliminar producto
  async eliminar(id) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id)

    if (error) throw error

    return true
  },

  // Cambiar visibilidad
  async cambiarEstado(id, activo) {
    return this.actualizar(id, { activo })
  },
}
