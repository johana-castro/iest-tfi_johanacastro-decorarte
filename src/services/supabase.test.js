import { supabase } from '../config/supabase'

export async function probarConexionSupabase() {
  try {
    const { data, error } = await supabase
      .from('configuracion_sitio')
      .select('id, nombre_negocio, sitio_activo')
      .eq('id', 1)
      .single()

    if (error) {
      throw error
    }

    console.log('Conexión con Supabase correcta:', data)

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error de conexión con Supabase:', error)

    return {
      success: false,
      error: error.message,
    }
  }
}