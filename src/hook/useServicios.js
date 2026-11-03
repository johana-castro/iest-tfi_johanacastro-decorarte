
import { useQuery } from '@tanstack/react-query'
import { serviciosService } from '../services/servicios.service'

export function useServicios(publicos = true) {
  return useQuery({
    queryKey: ['servicios', publicos ? 'publicos' : 'todos'],
    queryFn: () =>
      publicos
        ? serviciosService.obtenerPublicos()
        : serviciosService.obtenerTodos(),
  })
}
