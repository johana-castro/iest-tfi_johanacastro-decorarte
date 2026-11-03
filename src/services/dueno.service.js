
import { supabase } from '../config/supabase';

export const duenoService = {
  async crear(datos) {
    const { data, error } = await supabase.functions.invoke(
      'crear-dueno',
      {
        body: {
          nombre_completo: datos.nombre_completo,
          email: datos.email,
          password: datos.password
        }
      }
    );

    if (error) throw error;
    if (data?.error) throw new Error(data.error);

    return data;
  },

  async obtener() {
    const { data, error } = await supabase.functions.invoke(
      'gestionar-dueno',
      {
        body: { accion: 'consultar' }
      }
    );

    if (error) throw error;
    if (data?.error) throw new Error(data.error);

    return data.dueno;
  },

  async actualizar(nombre_completo) {
    const { data, error } = await supabase.functions.invoke(
      'gestionar-dueno',
      {
        body: {
          accion: 'editar',
          nombre_completo
        }
      }
    );

    if (error) throw error;
    if (data?.error) throw new Error(data.error);

    return data;
  },

  async suspender() {
    return this.ejecutarAccion('suspender');
  },

  async activar() {
    return this.ejecutarAccion('activar');
  },

  async eliminar() {
    return this.ejecutarAccion('eliminar');
  },

  async ejecutarAccion(accion) {
    const { data, error } = await supabase.functions.invoke(
      'gestionar-dueno',
      {
        body: { accion }
      }
    );

    if (error) throw error;
    if (data?.error) throw new Error(data.error);

    return data;
  }
};
