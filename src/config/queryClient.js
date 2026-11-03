
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Aumentado a 5 minutos para datos generales
      gcTime: 1000 * 60 * 15,   // Aumentado a 15 minutos en caché
      retry: 1,
      refetchOnWindowFocus: false, // Evita refetches innecesarios al cambiar de pestaña
    },
    mutations: {
      retry: 0,
    },
  },
})
