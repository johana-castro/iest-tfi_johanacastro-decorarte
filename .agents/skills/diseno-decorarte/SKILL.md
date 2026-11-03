---
name: diseno-decorarte
description: Diseña y modifica interfaces de DecorArte respetando identidad, tokens CSS, accesibilidad, responsive y patrones visuales del proyecto.
---

# Skill: diseno-decorarte

## Fuentes obligatorias
Leer `docs/IDENTIDAD-MARCA.md`, `docs/06-DISENO-UI.md`, `docs/CONSTITUCION.md` y componentes existentes antes de proponer cambios.

## Identidad
- Marca: DecorArte.
- Eslogan: «Las ideas también se decoran».
- Rosa `#E398B4`, lavanda `#C9B8E0`, durazno `#F7CFAE`, verde `#AFC79F`, beige `#FFFAF7`, carbón `#373334`, gris medio `#745B6C`.
- Playfair Display para títulos; Montserrat para interfaz.

## Reglas de ejecución
1. No introducir colores inline: usar variables CSS.
2. Diseñar desde 360 px y escalar a tablet/escritorio.
3. Mantener jerarquía visual, espacios, estados de carga/error/vacío y consistencia entre páginas.
4. Usar animaciones breves y respetar `prefers-reduced-motion`.
5. No reducir contraste para lograr una estética pastel.
6. Usar `alt` descriptivo; elementos decorativos con alt vacío.
7. Mantener controles solo icono con `aria-label` y foco visible.
8. No cambiar contratos de Supabase ni reglas de negocio durante una tarea visual.
9. Revisar las vistas pública, admin y dueño afectadas y capturas a 360, 768 y 1280 px.

## Entrega
Enumerar archivos modificados, tokens reutilizados, decisiones responsive, pruebas ejecutadas y pendientes reales.
