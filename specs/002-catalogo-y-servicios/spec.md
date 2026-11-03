# SPEC 002 — Descubrimiento de productos y servicios

## Contexto
El catálogo y los servicios son los accesos comerciales principales. Se requiere encontrar rápidamente productos y clasificar consultas de servicios sin alterar el modelo SQL existente.

## Historias de usuario
- Como visitante, quiero buscar productos por nombre o descripción.
- Como visitante, quiero conocer cuántos resultados veo y cuántos productos están publicados.
- Como visitante, quiero filtrar servicios por categorías predefinidas y buscar por texto.
- Como visitante, quiero identificar destacados y acceder a una consulta para un servicio.

## Requisitos funcionales (EARS)
- **RF01:** Cuando el visitante escriba en el buscador del catálogo, el sistema deberá filtrar por nombre y descripción sin distinguir mayúsculas.
- **RF02:** Mientras se muestran resultados, el sistema deberá indicar el número filtrado y el total publicado.
- **RF03:** Cuando el visitante seleccione una categoría de servicios, el sistema deberá mostrar solo servicios clasificados en esa categoría.
- **RF04:** Cuando el visitante busque en servicios, el sistema deberá filtrar por nombre y descripción.
- **RF05:** Si no existen resultados, el sistema deberá mostrar un estado vacío comprensible.
- **RF06:** Los servicios no deberán ofrecer acción de agregar al carrito; deberán dirigir a consulta/presupuesto.

## Categorías iniciales
Todos; Decoración de eventos; Ambientación; Detalles personalizados; Asesoramiento. La clasificación se deriva de palabras clave en nombre y descripción, por lo que se revisará al incorporar nuevos servicios.

## Casos límite
Acentos, campos nulos, búsqueda vacía, categoría sin resultados, descripción extensa, datos en carga/error, servicio cuyo nombre no coincide con sus palabras clave.

## Fuera de alcance
Categorías editables desde admin, paginación, ranking, filtros de precio, inventario y fichas individuales.

## Criterios de finalización
Filtros combinables, contador coherente, estado vacío y diseño responsive; servicios no se agregan al carrito.
