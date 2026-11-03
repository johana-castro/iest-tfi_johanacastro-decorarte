# Modelo de datos

## Entidades principales (Supabase)

| Tabla | Campos principales | Uso |
|---|---|---|
| `productos` | `id`, `nombre`, `slug`, `descripcion`, `precio`, `moneda`, `imagen_ruta`, `activo`, `destacado`, `orden`, fechas | Catálogo de productos artesanales. |
| `servicios` | `id`, `nombre`, `slug`, `descripcion`, `precio_desde`, `moneda`, `imagen_ruta`, `activo`, `destacado`, `orden`, fechas | Propuestas de decoración. |
| `preguntas_frecuentes` | `id`, `pregunta`, `respuesta`, `activo`, `orden`, fechas | Ayuda pública. |
| `perfiles` | `id` vinculado a Auth, `nombre_completo`, `rol_codigo`, `estado`, fechas | Perfil interno y rol. |
| `roles`, `permisos`, `roles_permisos` | códigos y relaciones | Autorización por permisos. |
| `configuracion_sitio` | `id`, `sitio_activo`, `mensaje_bloqueo`, fechas | Publicación global. |
| `visitas` | estructura mínima definida por migración | Preparación para estadísticas; no afirmar tracking activo si no está conectado. |

## Ejemplo ilustrativo (no es un registro real)

```json
{
  "nombre": "Centro de mesa artesanal",
  "slug": "centro-de-mesa-artesanal",
  "descripcion": "Detalle decorativo para celebraciones. Consultar variantes.",
  "precio": 0,
  "moneda": "ARS",
  "imagen_ruta": null,
  "activo": true,
  "destacado": false,
  "orden": 0
}
```

## Solicitudes
El formulario de presupuesto y el carrito generan mensajes en el dispositivo y abren WhatsApp. No se persisten como entidad ni se consideran pedidos confirmados. El contacto directo no implica una reserva.

## Relaciones y reglas
- Un perfil tiene un único rol.
- Un rol puede asignarse a muchos perfiles.
- Roles y permisos se relacionan muchos a muchos.
- El rol `dueno` se limita a una única cuenta activa/registrada según índice de la base.
- `imagen_ruta` referencia un objeto del bucket `catalogo`.
- Los slugs se generan automáticamente desde el nombre; el usuario del panel no necesita editarlos.
- El orden de alta se asigna automáticamente; no se expone en el formulario.
