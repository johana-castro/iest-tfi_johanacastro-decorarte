# SPEC 001 — Carrito de productos y solicitud por WhatsApp

## Contexto
Los clientes pueden elegir productos artesanales desde el catálogo. DecorArte necesita recibir una lista ordenada por WhatsApp, sin incorporar pagos ni prometer stock.

## Historias de usuario
- Como visitante, quiero agregar productos al carrito para reunir lo que deseo consultar.
- Como visitante, quiero aumentar o disminuir cantidades y quitar productos antes de enviar.
- Como visitante, quiero enviar el resumen al WhatsApp del negocio para continuar la conversación.
- Como responsable del negocio, quiero que el mensaje indique que el stock y el precio deben confirmarse.

## Requisitos funcionales (EARS)
- **RF01:** Cuando el visitante presione «Agregar al pedido» en un producto publicado, el sistema deberá añadirlo al carrito e incrementar cantidad si ya existe.
- **RF02:** Cuando el visitante cambie cantidad, el sistema deberá recalcular cantidad y total estimado; si la cantidad llega a cero, deberá quitar el ítem.
- **RF03:** Mientras el visitante navegue por la sesión, el carrito deberá conservarse localmente tras recargas.
- **RF04:** Cuando el visitante solicite enviar el pedido, el sistema deberá preparar un mensaje con producto, cantidad, precio disponible y total estimado.
- **RF05:** El mensaje deberá aclarar que el pedido queda sujeto a confirmación de stock y disponibilidad.
- **RF06:** Si no existe número de WhatsApp configurado, el sistema deberá informar el problema sin afirmar que envió el pedido.
- **RF07:** El sistema no deberá permitir agregar servicios al carrito.

## Casos límite
- Carrito vacío; precio nulo/cero; producto repetido; cantidad cero; cantidad superior a 99; moneda no configurada; número de WhatsApp vacío; almacenamiento local corrupto; producto que deja de estar publicado después de agregarse.

## Fuera de alcance
Pagos, checkout, reserva de stock, orden persistida, descuentos, envíos y confirmación automática.

## Criterios de finalización
Todos los RF cubiertos por tests o pruebas manuales; controles accesibles; mensaje de confirmación manual explícito; el carrito funciona en 360 px y escritorio.
