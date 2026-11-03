# Clarificación QA — SPEC 002

| Hallazgo | Riesgo | Decisión |
|---|---|---|
| El esquema actual no tiene tabla de categorías. | Requerir migración innecesaria. | Categorías predefinidas por reglas de palabras clave en frontend. |
| Algunos servicios pueden no encajar en categorías específicas. | Clasificación incorrecta. | Categoría por defecto «Decoración de eventos»; revisar textos al cargar datos. |
| El contador podría mostrar total filtrado como total general. | Información confusa. | Mostrar `filtrados de publicados`. |
| Campos pueden ser nulos. | Error al llamar `toLowerCase`. | Normalizar a string vacío. |

**Decisión del estudiante:** mantener el esquema actual y no incorporar un CRUD de categorías en esta entrega.
