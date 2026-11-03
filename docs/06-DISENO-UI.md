# Diseño UI/UX

## Dirección visual
DecorArte combina calidez artesanal, delicadeza y claridad. Beige claro como base; rosa, lavanda, durazno y verde suave como acentos; carbón para texto y superficies oscuras puntuales. Playfair Display para títulos y Montserrat para interfaz y cuerpo.

## Patrones
- Header sticky con marca en imagen; navegación horizontal en escritorio y menú compacto en móvil.
- Footer de cuatro grupos: marca/eslogan, mapa del sitio, contacto y presentación.
- Home con hero fotográfico, propuesta, destacados y servicios.
- Catálogo con buscador, estados vacíos, cards e incorporación al carrito.
- Servicios con categorías rápidas y búsqueda; no hay botón de carrito en servicios.
- Contacto reúne consulta general y solicitud de presupuesto.
- Acciones flotantes discretas: WhatsApp, carrito y volver arriba cuando corresponde.
- Paneles con navegación plegable en escritorio y barra inferior en móvil.
- Formularios compactos, etiquetas claras, validación y feedback Toastify/SweetAlert2.

## Accesibilidad y responsive
- Base desde 360 px; adaptar a tablet y escritorio.
- No depender solo del color para comunicar estado.
- `aria-label` en acciones solo icono, foco visible y controles operables con teclado.
- `alt` descriptivo para imágenes de contenido; `alt=""` en decorativas.
- Respetar `prefers-reduced-motion`.
- Revisar contraste especialmente en rosa claro; texto principal no se coloca sobre fondos rosa sin contraste.
