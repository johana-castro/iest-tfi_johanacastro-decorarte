# MEMORY.md — Memoria persistente del proyecto

## Identidad
- Nombre exacto: DecorArte. Eslogan: «Las ideas también se decoran».
- Rubro: manualidades, adornos, regalos artesanales y decoración de eventos.
- Tono: cálido, cercano, delicado y claro; español rioplatense moderado.
- Paleta y fuentes: `docs/IDENTIDAD-MARCA.md` y tokens en `src/index.css`.

## Arquitectura confirmada
- SPA React + Vite + JavaScript.
- Backend Supabase: Auth, PostgreSQL, RLS, Storage y Edge Functions.
- Datos/cache: TanStack Query; validación: Zod donde corresponda; formularios con React Hook Form; avisos Toastify; confirmaciones SweetAlert2.
- El sitio es de un único emprendimiento. Roles: `administrador` y `dueno`; el público no se registra.
- Tablas y columnas en español. Buckets: `catalogo`, carpetas `productos/` y `servicios/`.

## Reglas funcionales
- Catálogo público de productos y servicios activos.
- Carrito solo de productos, persistido localmente, con cantidades y envío del resumen a WhatsApp.
- El pedido no queda confirmado hasta que DecorArte confirme stock/precio.
- Servicios y presupuestos son consultas, no se agregan al carrito.
- No pagos online ni reservas automáticas.
- El dueño administra productos, servicios y preguntas frecuentes; administrador tiene control global y gestión del dueño.

## Restricciones
- No inventar número de WhatsApp, email, redes, dirección, precios, inventario ni datos reales. Configurarlos mediante `.env`.
- No almacenar secretos en variables `VITE_*` salvo la clave pública/publishable diseñada para cliente.
- `SERVICE_ROLE_KEY` solo en Edge Functions.
- El bloqueo de 3 intentos del login en frontend es una protección UX, no reemplaza rate limiting del servidor.
- Las métricas, Lighthouse, commits y pruebas se documentan solo con evidencia real.

## Estado de documentación
La documentación TP4 y las specs se consolidan en esta versión. Cuando una tarea futura cambie una decisión, actualizar esta memoria y los documentos afectados.
