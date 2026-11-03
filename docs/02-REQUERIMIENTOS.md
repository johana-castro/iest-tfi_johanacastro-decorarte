# Requerimientos de DecorArte

## Requerimientos funcionales

| Código | Requerimiento | Prioridad |
|---|---|---|
| RF01 | Mostrar una página de inicio que presente DecorArte y sus propuestas. | Alta |
| RF02 | Mostrar un catálogo de manualidades con imagen, nombre, descripción y precio o leyenda “Consultar”. | Alta |
| RF03 | Permitir filtrar productos por categoría. | Media |
| RF04 | Mostrar una página o sección con los servicios de decoración de eventos. | Alta |
| RF05 | Permitir abrir el detalle de un producto o servicio. | Media |
| RF06 | Ofrecer un formulario para solicitar presupuesto de decoración. | Alta |
| RF07 | Mostrar datos de contacto y enlaces a los canales oficiales que se configuren. | Alta |
| RF08 | Validar campos obligatorios del formulario y mostrar mensajes claros. | Alta |
| RF09 | Permitir que administrador y dueño autorizado gestionen productos y servicios desde el panel. | Alta |
| RF10 | Mostrar preguntas frecuentes sobre pedidos, personalización y consultas. | Media |

## Requerimientos no funcionales

| Código | Requerimiento | Prioridad |
|---|---|---|
| RNF01 | Adaptarse a celulares, tabletas y computadoras. | Alta |
| RNF02 | Mantener una navegación simple y comprensible. | Alta |
| RNF03 | Cargar las páginas con rapidez y optimizar el peso de las imágenes. | Alta |
| RNF04 | Mantener buen contraste, textos alternativos y etiquetas de formulario. | Alta |
| RNF05 | Proteger los datos enviados por los clientes. | Alta |
| RNF06 | Permitir actualizar catálogo y contenidos sin rehacer todo el sitio. | Media |
| RNF07 | Mantener coherencia visual con la identidad de DecorArte. | Alta |
| RNF08 | Funcionar en versiones actuales de los principales navegadores. | Media |

## Historia de usuario
Como persona interesada en una decoración, quiero describir la ocasión, la fecha aproximada y mis preferencias para que DecorArte pueda orientarme y preparar un presupuesto.

## Criterios de aceptación
- El formulario indica qué campos son obligatorios.
- No permite enviar campos obligatorios vacíos.
- Informa si la solicitud se envió o si ocurrió un error.
- La solicitud se considera una consulta, no una reserva confirmada.
- El sitio se puede utilizar desde un celular.

## Requerimientos ampliados del TP4 (versión actual)

| Código | Requerimiento | Prioridad |
|---|---|---|
| RF11 | Permitir agregar productos publicados a un carrito local. | Alta |
| RF12 | Permitir incrementar, reducir y quitar productos del carrito. | Alta |
| RF13 | Preparar resumen de pedido por WhatsApp con aviso de confirmación manual. | Alta |
| RF14 | No permitir agregar servicios al carrito; ofrecer consulta/presupuesto. | Alta |
| RF15 | Filtrar servicios por categorías rápidas y búsqueda textual. | Media |
| RF16 | Integrar contacto y solicitud de presupuesto en una misma vista. | Alta |
| RF17 | Mostrar navegación pública responsive, acciones flotantes y footer con mapa del sitio. | Media |
| RF18 | Pausar la interfaz de login durante 60 segundos después de tres intentos fallidos consecutivos. | Media; protección UX, no sustituye rate limiting del servidor. |
| RF19 | Generar slug y orden internos al crear productos/servicios, sin exponer esos campos en formularios. | Media |
| RF20 | Mostrar confirmaciones visuales de eliminación y navegación privada plegable. | Media |


## Estado de requisitos heredados TP3

- RF03 (categorías de productos) y RF05 (detalle individual de producto/servicio) permanecen como pendientes de alcance: el modelo actual de productos no tiene una categoría persistida y no se incorporaron rutas de detalle. No se simula su cumplimiento. Las categorías rápidas de servicios se especifican por separado en RF15.
