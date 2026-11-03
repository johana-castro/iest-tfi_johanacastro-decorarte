# Seguridad y privacidad

## Datos y minimización
El sitio puede recibir nombre, email, teléfono, detalles de una consulta y selección de productos. En la versión actual esos mensajes se preparan en el navegador y se entregan al canal WhatsApp; no se guardan como solicitudes en Supabase.

## Controles
- Supabase RLS en todas las tablas expuestas; revisar políticas antes de publicar.
- La clave `SERVICE_ROLE_KEY` solo se configura como secreto de Edge Functions.
- La clave publicable de Supabase puede estar en `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Desactivar registro público; el administrador crea la cuenta única del dueño.
- Validar sesión y rol en Edge Functions; no confiar en rutas protegidas del frontend.
- Validar entradas con límites; escapar contenido; no renderizar HTML arbitrario.
- Storage con tipos de imagen permitidos y límite de 5 MB; borrar objetos solo de las rutas permitidas.
- HTTPS en producción, dependencias revisadas y credenciales rotadas ante incidentes.
- `.env` excluido de Git; usar `.env.example` sin valores secretos.
- No incluir datos personales, claves ni información privada en prompts.

## Limitación del bloqueo de login
El contador de tres intentos y la pausa de 60 segundos se guardan en `localStorage`: es una barrera de experiencia de usuario, no una medida de seguridad robusta, porque puede borrarse o eludirse. Para producción debe complementarse con rate limiting del proveedor/Auth, monitoreo y controles del lado servidor.

## Privacidad y consentimiento
Explicar qué datos se comparten por WhatsApp y con qué finalidad. No reutilizar los datos para marketing sin consentimiento. Definir una política de retención si en el futuro se almacenan consultas.

## Incidentes
Revocar/rotar secretos comprometidos, revisar accesos, limitar exposición, corregir la causa y documentar el incidente antes de reanudar.
