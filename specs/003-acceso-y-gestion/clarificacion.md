# Clarificación QA — SPEC 003

| Hallazgo | Riesgo | Decisión |
|---|---|---|
| Un bloqueo guardado solo en navegador se puede eludir. | Falsa sensación de seguridad. | Se define como mitigación UX, no como control de seguridad; el rate limit real depende de Auth/servidor. |
| Slug debe ser único para mantener integridad. | Dos nombres equivalentes pueden colisionar. | Generarlo automáticamente; si Supabase devuelve conflicto, mostrar error y corregir nombre o slug en capa de servicio/operación. |
| Orden puede quedar repetido tras eliminaciones. | No representa una secuencia sin huecos. | Usar máximo actual + 1; orden es interno, no secuencia contable. |
| El menú contraído puede ocultar contexto. | Navegación poco clara. | Mantener iconos, estado activo, tooltip/title y botón de expansión. |
| Confirmación de eliminación debe ser reversible. | Borrado accidental. | Cancelar por defecto; acción destructiva explícita y diferenciada. |

**Decisión del estudiante:** mantener el bloqueo cliente para la experiencia solicitada y documentar que producción requiere rate limiting del proveedor. No se reemplaza autorización Supabase por controles de UI.
