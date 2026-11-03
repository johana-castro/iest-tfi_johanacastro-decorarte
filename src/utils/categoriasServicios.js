export const CATEGORIAS_SERVICIOS = ['Todos', 'Decoración de eventos', 'Ambientación', 'Detalles personalizados', 'Asesoramiento'];
export function categorizarServicio(servicio) {
  const texto = `${servicio?.nombre || ''} ${servicio?.descripcion || ''}`.toLowerCase();
  if (/asesor|orientaci|consulta/.test(texto)) return 'Asesoramiento';
  if (/souvenir|regalo|personaliz|recuerdo|artesanal/.test(texto)) return 'Detalles personalizados';
  if (/mesa|espacio|ambient|centro/.test(texto)) return 'Ambientación';
  return 'Decoración de eventos';
}
export function filtrarServicios(servicios, categoria, busqueda) {
  const termino = String(busqueda || '').trim().toLowerCase();
  return servicios.filter((servicio) => (categoria === 'Todos' || categorizarServicio(servicio) === categoria) && (!termino || `${servicio?.nombre || ''} ${servicio?.descripcion || ''}`.toLowerCase().includes(termino)));
}
