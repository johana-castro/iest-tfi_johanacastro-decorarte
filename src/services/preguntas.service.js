
import { supabase } from '../config/supabase'

const TABLE = 'preguntas_frecuentes'

export const preguntasService = {
  async obtenerPublicas() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })

    if (error) throw error

    return data
  },

  async obtenerTodos() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('orden', { ascending: true })
      .order('creado_en', { ascending: false })

    if (error) throw error

    return data
  },

  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return data
  },

  async crear(pregunta) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(pregunta)
      .select()
      .single()

    if (error) throw error

    return data
  },

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

  async eliminar(id) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id)

    if (error) throw error

    return true
  },

  async cambiarEstado(id, activo) {
    return this.actualizar(id, { activo })
  },
}
