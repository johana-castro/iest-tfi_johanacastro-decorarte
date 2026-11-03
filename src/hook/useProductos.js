
import { useQuery } from '@tanstack/react-query'
import { productosService } from '../services/productos.service'

export function useProductos(publicos = true) {
  return useQuery({
    queryKey: ['productos', publicos ? 'publicos' : 'todos'],
    queryFn: () =>
      publicos
        ? productosService.obtenerPublicos()
        : productosService.obtenerTodos(),
  })
}
