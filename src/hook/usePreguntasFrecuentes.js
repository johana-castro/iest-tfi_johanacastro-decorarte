
import { useQuery } from '@tanstack/react-query'
import { preguntasService } from '../services/preguntas.service'

export function usePreguntasFrecuentes(publicas = true) {
  return useQuery({
    queryKey: ['preguntas-frecuentes', publicas ? 'publicas' : 'todas'],
    queryFn: () =>
      publicas
        ? preguntasService.obtenerPublicas()
        : preguntasService.obtenerTodas(),
  })
}
