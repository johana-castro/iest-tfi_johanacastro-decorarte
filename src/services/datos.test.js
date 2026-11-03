
import { productosService } from './productos.service'
import { serviciosService } from './servicios.service'
import { preguntasService } from './preguntas.service'

export async function probarServicios() {
  try {
    const [productos, servicios, preguntas] = await Promise.all([
      productosService.obtenerPublicos(),
      serviciosService.obtenerPublicos(),
      preguntasService.obtenerPublicas(),
    ])

    console.log('PRODUCTOS:', productos)
    console.log('SERVICIOS:', servicios)
    console.log('PREGUNTAS FRECUENTES:', preguntas)

    return {
      success: true,
      productos,
      servicios,
      preguntas,
    }
  } catch (error) {
    console.error('Error al consultar los datos:', error)

    return {
      success: false,
      error: error.message,
    }
  }
}
