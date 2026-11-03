# Tecnologías y justificación del stack

## Stack implementado

| Capa | Tecnología | Responsabilidad |
|---|---|---|
| Interfaz | React 19 + JavaScript | Componentes y vistas. |
| Herramienta de desarrollo | Vite | Servidor local y build estático. |
| Estilos | Tailwind CSS 4 + CSS propio | Utilidades y tokens visuales centralizados. |
| Rutas | React Router | Navegación pública y áreas privadas. |
| Backend como servicio | Supabase | PostgreSQL, Auth, RLS, Storage y Edge Functions. |
| Datos remotos | TanStack Query | Caché, estados de carga y mutaciones. |
| Formularios | React Hook Form + Zod | Gestión y validación de formularios donde se integra. |
| Notificaciones | React Toastify | Feedback de operaciones. |
| Confirmaciones | SweetAlert2 | Confirmaciones controladas dentro de la interfaz. |
| Iconografía | React Icons | Iconos consistentes. |
| Pruebas | Node.js test runner (`node:test`) | Pruebas unitarias de lógica pura sin navegador. |

## Justificación respecto del stack de clase
La consigna menciona React con Next.js, PostgreSQL, GitHub y Vercel. DecorArte conserva React y PostgreSQL (a través de Supabase), pero usa Vite en lugar de Next.js y Supabase como plataforma backend administrada. Se priorizó una SPA pequeña, con páginas públicas y paneles privados, menor complejidad operativa y autenticación/Storage/RLS integrados. Esta decisión implica que el SEO depende de metadatos, contenido y prerenderizado/servicio de hosting; revisar su impacto con Lighthouse.

## Alcance y límites
- No hay pagos en línea, inventario transaccional, confirmación automática ni reservas.
- El carrito arma una solicitud y deriva a WhatsApp; no crea una orden persistente en base de datos.
- No se incluye un backend Node/Express propio.
- La clave publicable de Supabase puede estar en el cliente; `SERVICE_ROLE_KEY` nunca.
- Las versiones exactas se consultan en `package.json` y `package-lock.json`.
