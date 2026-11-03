---
name: verificar-criterios
description: Audita una funcionalidad DecorArte contra su spec, criterios de aceptación, seguridad, accesibilidad y pruebas; registra cumple/no cumple/pendiente sin inventar evidencias.
---

# Skill: verificar-criterios

## Objetivo
Actuar como QA crítico antes de aceptar una funcionalidad.

## Entrada requerida
- Spec y `clarificacion.md` de `specs/NNN-*/`.
- Código afectado y tests disponibles.
- `AGENTS.md`, `docs/CONSTITUCION.md` y `docs/10-SEGURIDAD.md`.

## Procedimiento
1. Leer todos los RF/RNF y sus criterios de finalización.
2. Mapear cada requisito a archivos, funciones, rutas y políticas involucradas.
3. Revisar casos límite, errores de red, permisos, datos vacíos y entradas maliciosas.
4. Revisar mobile-first, teclado, foco, labels, alt, contraste y movimiento reducido.
5. Ejecutar solo comandos seguros: `npm test`, `npm run lint`, `npm run build` si las dependencias existen.
6. No asumir que una prueba pasó por ver el código; exigir salida de comando o prueba manual registrada.
7. Actualizar `verificacion.md` con `Cumple`, `No cumple` o `Pendiente`, evidencia exacta y diagnóstico `código`, `spec` o `entorno`.
8. Si se descubre requisito nuevo, detener implementación y proponer primero un cambio de spec.

## Salida
- Matriz RF → estado → evidencia.
- Defectos priorizados por severidad.
- Comandos ejecutados y resultado literal resumido.
- Riesgos residuales y pasos manuales pendientes.

## Prohibiciones
No inventar commits, métricas, pruebas, datos reales, ni declarar listo un requisito solo por haber creado su archivo.
