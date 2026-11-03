# AGENTS.md — DecorArte

## Misión
Mantener y evolucionar el sitio del emprendimiento DecorArte: manualidades, productos artesanales y servicios de decoración. Eslogan: **«Las ideas también se decoran»**.

## Lectura obligatoria antes de cambiar código
1. `docs/CONSTITUCION.md`
2. `MEMORY.md`
3. `docs/IDENTIDAD-MARCA.md`
4. `docs/01-CONTEXTO.md` a `docs/10-SEGURIDAD.md`
5. La carpeta `specs/` de la funcionalidad afectada (spec, clarificación, plan, tareas y verificación)
6. `README.md` y `docs/ARQUITECTURA.md`

## Reglas no negociables
- No cambiar el nombre comercial DecorArte, el eslogan, el stack ni los contratos de Supabase sin actualizar primero la documentación y obtener aprobación.
- No inventar precios, disponibilidad, stock, dirección, testimonios, reseñas ni datos de contacto. Si falta un dato, dejar «Consultar» o una variable de entorno vacía.
- Un pedido por WhatsApp es una solicitud; jamás presentarlo como venta confirmada. El dueño confirma stock, precio final y condiciones.
- Solo los productos entran al carrito. Los servicios conducen a consulta/presupuesto.
- No exponer `SERVICE_ROLE_KEY`, claves privadas, contraseñas ni datos personales en el frontend, logs o repositorio.
- Mantener RLS y validación del lado servidor. No confiar en controles del navegador como seguridad.
- Mantener colores y tipografías mediante tokens CSS en `src/index.css`.
- Mobile-first desde 360 px, teclado, foco visible, etiquetas, contraste y `alt` descriptivo.
- Respetar las capas existentes: páginas → hooks/servicios → Supabase. No acceder a Supabase directamente desde componentes de presentación si ya existe un service.
- No introducir librerías nuevas sin justificar peso, mantenimiento y beneficio.
- Trabajar una funcionalidad por vez, con tests antes de aceptar el cambio y revisión del diff.
- No marcar tareas, tests, Lighthouse, deploy ni piezas multimedia como realizados sin evidencia reproducible.

## Flujo SDD
Antes de implementar: leer spec → revisar clarificación → validar plan y tareas. Si cambia un requisito, editar spec primero. Después implementar, probar y actualizar `verificacion.md`.

## Comandos permitidos
No ejecutar comandos destructivos, migraciones remotas, despliegues ni cambios de Auth/Storage sin mostrar el comando y obtener confirmación humana.
