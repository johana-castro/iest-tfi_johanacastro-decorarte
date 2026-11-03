# DecorArte — Las ideas también se decoran

Sitio web de un emprendimiento dedicado a manualidades, adornos, regalos artesanales y decoración de eventos. El proyecto permite conocer la marca, explorar el catálogo de productos, consultar servicios y solicitar presupuestos. Incluye un área privada para administrar el contenido.

> Los pedidos de productos y las consultas se preparan para continuar por WhatsApp. El envío de un mensaje no confirma stock, precio final, reserva ni compra: DecorArte debe revisar y confirmar cada solicitud.

## Tecnologías

- **Frontend:** React 19, JavaScript y Vite.
- **Estilos:** Tailwind CSS 4 y CSS con tokens de marca.
- **Rutas:** React Router.
- **Backend:** Supabase (PostgreSQL, Auth, Row Level Security, Storage y Edge Functions).
- **Datos remotos:** TanStack Query.
- **Validación/formularios:** Zod, React Hook Form y `@hookform/resolvers`.
- **Feedback:** React Toastify y SweetAlert2.
- **Iconos:** React Icons.
- **Tests:** Node.js Test Runner (`node:test`).

La elección Vite en lugar de Next.js se justifica en `docs/03-TECNOLOGIAS.md`.

## Funcionalidades

### Sitio público
- Home con identidad, propuesta, productos destacados y servicios.
- Catálogo con búsqueda, contador y cards de producto.
- Carrito compacto con persistencia local, sumar/restar/eliminar y resumen a WhatsApp.
- Filtros por categorías predefinidas y búsqueda en servicios.
- Preguntas frecuentes, Nosotros y Contacto.
- Formulario de presupuesto integrado dentro de Contacto.
- Botón flotante de WhatsApp y volver arriba.
- Footer con mapa del sitio y marca.

### Área privada
- Login para `administrador` y `dueno`.
- Gestión de productos, servicios y preguntas frecuentes.
- Carga de imágenes en Supabase Storage.
- Slug y orden internos generados automáticamente.
- Confirmaciones visuales para operaciones destructivas.
- Menú lateral plegable y navegación adaptada a pantallas pequeñas.
- Configuración de publicación y gestión de la única cuenta dueña.

## Requisitos previos

- Node.js LTS y npm.
- Proyecto Supabase.
- Variables públicas de Supabase y datos de contacto del negocio.
- Supabase CLI solo si se van a desplegar las Edge Functions desde terminal.

## Instalación local

1. Descargar/clonar el repositorio.
2. Instalar dependencias:

```bash
npm install
```

3. Crear `.env` en la raíz (no subirlo a Git). Variables necesarias:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
# Alternativa compatible con configuración anterior:
# VITE_SUPABASE_ANON_KEY=
VITE_WHATSAPP_NUMBER=
VITE_NEGOCIO_EMAIL=
VITE_INSTAGRAM_URL=
VITE_FACEBOOK_URL=
```

`VITE_WHATSAPP_NUMBER` debe incluir código de país y área, solo dígitos (Argentina: prefijo 54; no inventar el número). Los datos de contacto pueden quedar vacíos hasta confirmar los oficiales.

4. Iniciar servidor:

```bash
npm run dev
```

Vite muestra la URL local, normalmente `http://localhost:5173`.

## Comandos de calidad

```bash
npm test       # pruebas unitarias Node
npm run lint   # ESLint
npm run build  # build de producción
npm run preview
```

## Configuración de Supabase

La migración principal se encuentra en `supabase/migrations/20261102000000_decorarte_base_completa.sql`. La guía detallada de instalación/Storage está en `docs/INSTALACION_SUPABASE_Y_STORAGE.md` (si se distribuye junto al paquete SQL previo, seguir también ese manual).

Resumen:
1. Crear proyecto Supabase nuevo.
2. Ejecutar la migración en SQL Editor.
3. Configurar Auth Email/Password y deshabilitar registros públicos.
4. Crear el usuario administrador en Auth y su fila en `perfiles` con `rol_codigo='administrador'`.
5. Confirmar bucket `catalogo` y políticas de Storage.
6. Configurar secretos `PUBLISHABLE_KEY`, `SERVICE_ROLE_KEY` y `FRONTEND_ORIGIN` para las Edge Functions.
7. Desplegar `crear-dueno` y `gestionar-dueno` con `verify_jwt=true`.
8. Revisar RLS, CORS, Redirect URLs y origen de producción antes de publicar.

Nunca colocar `SERVICE_ROLE_KEY` en variables `VITE_*` ni en el navegador.

## Storage

El bucket `catalogo` contiene rutas `productos/` y `servicios/`. Los formularios aceptan JPEG, PNG, WebP y AVIF hasta 5 MB. La base guarda la ruta del objeto (`imagen_ruta`); el frontend obtiene URL pública. Las carpetas aparecen cuando se sube el primer archivo.

## Estructura principal

```text
.
├── AGENTS.md · CLAUDE.md · MEMORY.md
├── docs/                 # TP3/TP4, arquitectura, seguridad, identidad e informe
├── specs/                # 3 funcionalidades SDD con fases y verificación
├── .agents/skills/       # 2 skills propias + guía de skills externas
├── .opencode/command/    # /spec /clarificar /verificar /cambio
├── src/                  # React app
├── supabase/             # config, Edge Functions y migración
├── tests/                # tests unitarios
├── multimedia/           # fichas y carpetas de piezas pendientes
└── public/               # marca y recursos visuales
```

## Agentes y SDD
Antes de pedir cambios a un agente, indicarle que lea `AGENTS.md`, `docs/CONSTITUCION.md`, `memory.md`, identidad de marca y la spec relacionada. Trabajar una tarea por conversación. En OpenCode se preparan los comandos `/spec`, `/clarificar`, `/verificar` y `/cambio` en `.opencode/command/`.

Skills propias:
- `.agents/skills/verificar-criterios/SKILL.md`
- `.agents/skills/diseno-decorarte/SKILL.md`

Skills externas:+

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/anthropics/skills --skill webapp-testing
```

## Estado de pruebas de esta entrega

`npm test` se ejecutó durante la preparación del paquete: **11 pruebas aprobadas, 0 fallidas**. También se analizaron 61 archivos JS/JSX con el parser TypeScript: 0 errores de sintaxis; imports relativos: 0 rutas faltantes. No se pudo completar la instalación de dependencias dentro del entorno de preparación, por lo que `npm run build` y `npm run lint` quedan pendientes de ejecutar localmente.

## Documentación TP4 y pendientes

- `specs/001-carrito-pedidos/`: carrito y solicitud WhatsApp.
- `specs/002-catalogo-y-servicios/`: búsqueda y categorías.
- `specs/003-acceso-y-gestion/`: acceso, CRUD y paneles.
- `docs/HARNESS.md`, `docs/ESTADO-ENTREGA-TP4.md`, `docs/MATRIZ-HERRAMIENTAS.md`, `docs/RIESGOS-ETICA.md`, `docs/DECLARACION-IA.md`.
- `multimedia/FICHAS-IA.md`, guiones de spot y defensa.
- `docs/INFORME-TP4-PLANTILLA.md` y `ENLACES.md`.

Las verificaciones diferencian implementación de pruebas pendientes. Antes de entregar se deben completar: pruebas manuales reales de Auth/RLS/WhatsApp, build y Lighthouse, despliegue, 8 imágenes fotorrealistas con fichas e iteraciones, spot 45–90 s, video demo 2–3 min, infografía, 3 gráficos con datos reales, errores reales de IA, vínculo con el dilema del TP1, informe PDF y defensa.

## Datos comerciales

No se incluyen números, email, redes, dirección, precios ni stock inventados. Configurar los datos oficiales del negocio en `.env` y cargar las imágenes reales de productos/servicios desde el panel. El estudiante debe confirmar derechos/licencias de las imágenes aportadas.

## Créditos

Proyecto académico individual — TP4, Instituto de Estudios Superiores de Tinogasta, 2026. Desarrollo y diseño: JMC (según indicación de identidad del proyecto).
