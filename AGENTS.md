# AGENTS.md — DecorArte

**Misión:** Mantener y evolucionar el sitio de DecorArte («Las ideas también se decoran»).

## Comandos Esenciales
```bash
npm run dev      # Inicia servidor de desarrollo Vite
npm run build    # Build de producción
npm run lint     # ESLint
npm test         # Pruebas unitarias Node (node:test)
```

## Arquitectura y Capas
- **Capas obligatorias:** `src/page/` (vistas) → `src/hook/` (coordinación) → `src/services/` (Supabase y Storage) → Supabase. Nunca acceder a Supabase directamente desde componentes de presentación si hay un service.
- **Stack:** React 19, Vite, Tailwind CSS 4, TanStack Query, React Hook Form, Zod, Supabase (PostgreSQL + RLS + Storage).

## Reglas Críticas (No Negociables)
1. **Contenido honesto:** No inventar precios, stock, dirección, testimonios ni datos de contacto. Usar `.env` o dejar «Consultar».
2. **WhatsApp:** Un pedido por WhatsApp es una solicitud, jamás una venta confirmada. El dueño confirma stock y precio final.
3. **Carrito vs Servicios:** Solo los productos entran al carrito. Los servicios conducen a consulta o presupuesto.
4. **Seguridad:** Nunca exponer `SERVICE_ROLE_KEY` en el cliente o variables `VITE_*`. Mantener RLS y validación del lado servidor.
5. **Estilos:** Mantener colores y tipografías mediante tokens CSS en `src/index.css` (Playfair Display, Montserrat, paleta de marca).
6. **Accesibilidad y Responsive:** Mobile-first desde 360px, foco visible, etiquetas y textos `alt` descriptivos.
7. **Imágenes:** Usar formatos `.webp` para optimizar rendimiento. Las rutas de imágenes deben ser relativas (ej. `./media/...`) para asegurar su correcta visualización en despliegues como Vercel.

## Flujo SDD y Verificación
- Antes de implementar: leer spec en `specs/`, clarificaciones, plan y tareas.
- Al finalizar: ejecutar `npm run lint` y `npm run build`, y actualizar `verificacion.md`. No marcar tareas ni pruebas como realizadas sin evidencia reproducible.
- **Comandos prohibidos / restringidos:** No ejecutar comandos destructivos, migraciones remotas, despliegues ni cambios de Auth/Storage sin confirmación humana.
