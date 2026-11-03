# MEMORY.md — Memoria persistente del proyecto DecorArte

## Identidad
- Nombre exacto: DecorArte. Eslogan: «Las ideas también se decoran».
- Rubro: manualidades, adornos, regalos artesanales y decoración de eventos.
- Tono: cálido, cercano, delicado y claro; español rioplatense moderado.
- Paleta y fuentes: `docs/IDENTIDAD-MARCA.md` y tokens en `src/index.css`.

## Arquitectura confirmada
- SPA React 19 + Vite + JavaScript (no Next.js).
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
- El dueño (`dueno`) administra productos, servicios y preguntas frecuentes.
- El administrador (`administrador`) tiene control global y gestión del dueño.
- El público solo consulta registros activos; RLS limita lectura/escritura.

## Restricciones críticas
- No inventar número de WhatsApp, email, redes, dirección, precios, inventario ni datos reales. Configurarlos mediante `.env`.
- **Nunca** almacenar `SERVICE_ROLE_KEY` en variables `VITE_*` ni en el frontend.
- La clave publicable `VITE_SUPABASE_PUBLISHABLE_KEY` es segura en cliente; la `SERVICE_ROLE_KEY` solo en secretos de Edge Functions.
- El bloqueo de 3 intentos del login en frontend es protección UX (localStorage), no reemplaza rate limiting del servidor.
- Las métricas, Lighthouse, commits y pruebas se documentan solo con evidencia real.
- No marcar tareas, tests, Lighthouse, deploy ni piezas multimedia como realizados sin evidencia reproducible.

## Flujo de calidad obligatorio
Antes de considerar finalizada una tarea:
1. Ejecutar `npm test` (tests unitarios en `tests/*.test.js`).
2. Ejecutar `npm run lint` (ESLint con configuración plana).
3. Ejecutar `npm run build` (verificar build de producción).
4. Revisar diff y evidencia en consola, teclado, responsive 360/768/1280 px, accesibilidad.
5. Actualizar `verificacion.md` de la spec correspondiente.

## Fuentes de documentación (orden de lectura)
1. `AGENTS.md` — Reglas de juego para agentes.
2. `docs/CONSTITUCION.md` — Principios comprobables.
3. `docs/04-ARQUITECTURA.md` — Organización por capas y flujos de datos.
4. `docs/10-SEGURIDAD.md` — Límites y controles de seguridad.
5. `specs/NNN-funcionalidad/` — Evidencia SDD por tarea actual.
6. `MEMORY.md` — Decisiones persistentes del proyecto.
7. `README.md` — Instalación, comandos y setup.