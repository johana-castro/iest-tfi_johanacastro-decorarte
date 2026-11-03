# SPEC 003 — Acceso privado y gestión de catálogo

## Contexto
La plataforma tiene paneles diferenciados para administrador y dueño. El área privada debe reducir errores de operación y presentar confirmaciones propias de la interfaz.

## Historias de usuario
- Como administrador o dueño autorizado, quiero iniciar sesión para acceder solo a mi panel.
- Como usuario, quiero recibir una pausa temporal después de tres errores consecutivos para evitar intentos repetidos desde el mismo navegador.
- Como gestor, quiero crear y editar productos/servicios sin manipular campos técnicos como slug u orden.
- Como gestor, quiero confirmar eliminaciones en un diálogo propio y no en una ventana nativa.
- Como gestor, quiero contraer el menú lateral para aprovechar el espacio de trabajo.

## Requisitos funcionales (EARS)
- **RF01:** Cuando las credenciales sean válidas, el sistema deberá dirigir al panel correspondiente al rol.
- **RF02:** Cuando se registren tres errores de autenticación consecutivos en el navegador, la interfaz deberá pausar nuevos intentos durante 60 segundos.
- **RF03:** Al crear un producto o servicio, el sistema deberá generar un slug interno desde el nombre.
- **RF04:** Al crear un producto o servicio, el sistema deberá asignar el siguiente orden disponible automáticamente.
- **RF05:** Los formularios no deberán mostrar slug ni orden como campos editables.
- **RF06:** Cuando se solicite eliminar un registro o cuenta, el sistema deberá mostrar confirmación con acción explícita.
- **RF07:** En escritorio, el menú lateral deberá poder contraerse y expandirse; en modo compacto conservará iconos y estado activo.
- **RF08:** En móvil, la navegación deberá utilizar una barra inferior compacta y permitir cerrar sesión con un botón iconográfico accesible.

## Casos límite
Recarga durante bloqueo; borrar localStorage; sesión expirada; rol inesperado; slug duplicado; nombres con acentos; borrado cancelado; error de mutación; pantalla tablet; navegación por teclado.

## Fuera de alcance
Bloqueo de IP o rate limiting real, MFA, restablecimiento de contraseña, auditoría de actividad, gestión de múltiples dueños.

## Criterios de finalización
Autorización real mantenida por Supabase/RLS/Edge Functions; UX de bloqueo y confirmaciones; campos técnicos ocultos; menú responsive.
