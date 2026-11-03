# Arquitectura de DecorArte

## Organización

- `src/page/`: pantallas agrupadas en público, auth, admin, owner y error.
- `src/components/`: componentes de presentación reutilizables.
- `src/layouts/`: estructura compartida de navegación.
- `src/routes/`: definición de rutas y protección por rol.
- `src/contexts/`: estado global de sesión y carrito.
- `src/hook/`: hooks de acceso a datos y autenticación.
- `src/services/`: operaciones Supabase y Storage.
- `src/config/`: cliente, configuración del negocio y TanStack Query.
- `src/utils/`: funciones puras y helpers.
- `supabase/functions/`: Edge Functions protegidas.
- `supabase/migrations/`: esquema SQL versionado.
- `specs/`: evidencia SDD por funcionalidad.

## Flujo de datos
1. La vista invoca un hook (`useProductos`, `useServicios`, etc.).
2. El hook delega la operación al servicio.
3. El servicio consulta Supabase; TanStack Query administra caché y estados.
4. RLS limita lo que cada rol puede leer o modificar, independientemente de la interfaz.
5. Las operaciones administrativas sensibles se ejecutan mediante Edge Functions que validan la sesión y rol.
6. Las imágenes se suben al bucket `catalogo`; la base almacena la ruta del objeto, no un archivo binario.

## Flujos comerciales
- Producto: catálogo → agregar al carrito → cambiar cantidades → preparar mensaje → WhatsApp → revisión manual de stock/precio por DecorArte.
- Servicio: servicios → categoría/búsqueda → consulta o presupuesto → WhatsApp → respuesta manual.
- Presupuesto: formulario → validación cliente → mensaje de WhatsApp → confirmación manual posterior.

## Autorización
`administrador` gestiona la configuración y cuenta propietaria; `dueno` administra catálogo/FAQ según permisos. El público solo consulta registros activos. El control de frontend no reemplaza RLS.
