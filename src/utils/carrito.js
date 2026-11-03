export function agregarProducto(items, producto) {
  const existente = items.find((item) => item.id === producto.id);
  if (existente) return items.map((item) => item.id === producto.id ? { ...item, cantidad: Math.min(99, item.cantidad + 1) } : item);
  return [...items, { id: producto.id, nombre: producto.nombre, precio: Number(producto.precio) || 0, moneda: producto.moneda || 'ARS', cantidad: 1 }];
}
export function actualizarCantidad(items, id, cantidad) {
  if (cantidad <= 0) return items.filter((item) => item.id !== id);
  return items.map((item) => item.id === id ? { ...item, cantidad: Math.min(99, cantidad) } : item);
}
export function calcularCantidad(items) { return items.reduce((suma, item) => suma + item.cantidad, 0); }
export function calcularTotal(items) { return items.reduce((suma, item) => suma + item.precio * item.cantidad, 0); }
export function crearMensajePedido(items) {
  const total = calcularTotal(items);
  const dinero = (valor, moneda = 'ARS') => new Intl.NumberFormat('es-AR', { style: 'currency', currency: moneda, maximumFractionDigits: 2 }).format(valor);
  const monedas = [...new Set(items.map((item) => item.moneda || 'ARS'))];
  const totalTexto = items.some((item) => !(item.precio > 0)) ? 'A confirmar' : monedas.length === 1 ? dinero(total, monedas[0]) : 'A confirmar (hay distintas monedas)';
  return ['Hola DecorArte, quisiera consultar por este pedido:', '', ...items.map((item) => `• ${item.nombre} x ${item.cantidad} — ${item.precio > 0 ? dinero(item.precio * item.cantidad, item.moneda) : 'Consultar precio'}`), '', `Total estimado: ${totalTexto}`, '', 'Entiendo que el pedido queda sujeto a confirmación de stock y disponibilidad.'].join('\n');
}
