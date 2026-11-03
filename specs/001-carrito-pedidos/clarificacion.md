# Clarificación QA — SPEC 001

| Hallazgo | Riesgo | Decisión |
|---|---|---|
| El precio puede ser cero o no estar cargado. | Mensaje podría mostrar total falso. | Mostrar «Consultar precio» por ítem y total estimado sin ocultar el aviso de confirmación. |
| El mismo producto puede agregarse varias veces. | Filas duplicadas. | Consolidar por `id` e incrementar cantidad. |
| El carrito no reserva stock. | Cliente puede interpretar disponibilidad como confirmada. | Mensaje visible en panel y WhatsApp aclara confirmación manual. |
| WhatsApp no está configurado en el entorno. | Link no válido. | Mostrar Toastify y no abrir ventana. |
| El usuario cambia cantidad a cero. | Ítem residual. | Quitarlo del carrito. |
| Se recarga la página. | Pérdida de selección. | Persistir en localStorage, sin guardar datos personales. |

**Decisión del estudiante:** se acepta el alcance de solicitud por WhatsApp; no se transforma en checkout ni orden confirmada. Los riesgos de manipulación de localStorage no afectan datos de servidor porque el carrito no autoriza ni cobra.
