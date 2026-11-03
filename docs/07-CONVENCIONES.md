# Convenciones de desarrollo

## Nombres e idioma
- Componentes React: PascalCase (`TarjetaProducto.jsx`).
- Funciones y variables: camelCase; constantes globales: MAYUSCULAS_CON_GUION_BAJO.
- Carpetas descriptivas en minúscula.
- Documentación y textos visibles en español; nombres propios de APIs/librerías se conservan.

## Código
- Preferir componentes pequeños y funciones puras testeables.
- No duplicar consultas ni lógica de negocio dentro de componentes de presentación.
- Evitar `any`, `eval`, HTML inseguro y concatenación de consultas.
- CSS de marca centralizado en variables.
- Validar datos en cliente y servidor.

## Commits
Formato recomendado: `tipo(área): descripción breve`.
Tipos: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `security`.
Ejemplos: `feat(carrito): agregar control de cantidades`; `test(catalogo): cubrir filtros de productos`.

## Ramas
`main` estable; ramas de trabajo `feat/nombre`, `fix/nombre`, `docs/nombre`. Para entrega individual, commits pequeños y ordenados.

## Revisión
Antes de integrar: `npm test`, `npm run lint`, `npm run build`; revisar diff, consola, teclado, responsive 360/768/1280 px, accesibilidad y datos reales.
