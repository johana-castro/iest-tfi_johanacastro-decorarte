# Plan — SPEC 001

1. Extraer operaciones puras de carrito a `src/utils/carrito.js`.
2. Cubrir agregar, consolidar, cantidad, total y mensaje con Node test runner.
3. Crear `CarritoContext` con persistencia local.
4. Añadir acción de carrito en card de producto; no modificar cards de servicios.
5. Crear panel flotante compacto con cantidades, eliminación y CTA WhatsApp.
6. Añadir feedback Toastify y texto de confirmación de stock.
7. Verificar navegación con teclado, pantalla pequeña y caso sin WhatsApp.

No se cambia el esquema de base de datos.
