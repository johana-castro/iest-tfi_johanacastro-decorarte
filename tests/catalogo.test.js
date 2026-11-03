import test from 'node:test';
import assert from 'node:assert/strict';
import { CATEGORIAS_SERVICIOS, categorizarServicio, filtrarServicios } from '../src/utils/categoriasServicios.js';

test('expone categorías rápidas definidas', () => {
  assert.ok(CATEGORIAS_SERVICIOS.includes('Ambientación'));
  assert.ok(CATEGORIAS_SERVICIOS.includes('Detalles personalizados'));
});
test('clasifica un servicio de souvenirs como detalle personalizado', () => {
  assert.equal(categorizarServicio({ nombre: 'Souvenirs de bautismo' }), 'Detalles personalizados');
});
test('combina categoría y búsqueda sin distinguir mayúsculas', () => {
  const datos = [
    { nombre: 'Centros de mesa', descripcion: 'Ambientación floral' },
    { nombre: 'Souvenirs', descripcion: 'Recuerdos artesanales' },
  ];
  assert.deepEqual(filtrarServicios(datos, 'Ambientación', 'MESA'), [datos[0]]);
});
test('clasifica texto vacío sin romper el filtro', () => {
  assert.equal(categorizarServicio({}), 'Decoración de eventos');
});
