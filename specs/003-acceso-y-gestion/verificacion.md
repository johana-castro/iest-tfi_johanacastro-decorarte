# Verificación — SPEC 003

| RF | Estado | Evidencia / prueba pendiente | Diagnóstico |
|---|---|---|---|
| RF01 | Implementado previamente; pendiente prueba real | `ProtectedRoute`, `AuthContext` | Confirmar con cuentas de ambos roles. |
| RF02 | Cumple como UX local | `LoginPage.jsx` | No sustituye rate limit del servidor. |
| RF03 | Cumple por implementación | `AdminCrudPage.jsx` | `crearSlug` aplicado en alta. |
| RF04 | Cumple por implementación | `AdminCrudPage.jsx` | Max orden + 1 en alta. |
| RF05 | Cumple por implementación | fields `hidden/auto` | Campos internos no se renderizan. |
| RF06 | Cumple por implementación | SweetAlert2 en CRUD y AdminDueno | Confirmación cancelable. |
| RF07 | Cumple por implementación | `AdminLayout.jsx`, `OwnerLayout.jsx` | Sidebar colapsable en escritorio. |
| RF08 | Cumple por implementación | Layouts privados | Barra inferior y botón iconográfico. |

**Validación estática:** 61 archivos JS/JSX analizados con el parser TypeScript, sin errores de sintaxis; imports relativos revisados, sin rutas faltantes. **Pendiente:** tests de integración Auth/RLS, prueba manual tablet/móvil, lint y build. La evidencia de UI no prueba la política de servidor.


**Limitación de entorno:** `npm ci --ignore-scripts --no-audit --no-fund` no finalizó dentro del tiempo disponible; por eso no se pudo ejecutar `npm run build` ni `npm run lint`. No se declara build exitoso.
