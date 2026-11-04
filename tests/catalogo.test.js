
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  categorizarServicio,
  filtrarServicios
} from '../src/utils/categoriasServicios.js';

const servicios = [
  {
    nombre: 'Decoración de cumpleaños',
    descripcion: 'Decoración de fiestas'
  },
  {
    nombre: 'Souvenirs personalizados',
    descripcion: 'Regalos artesanales'
  },
  {
    nombre: 'Asesoramiento para eventos',
    descripcion: 'Orientación para celebraciones'
  }
];

test('Mostrar todos los servicios', () => {
  const resultado = filtrarServicios(servicios, 'Todos', '');

  assert.equal(resultado.length, 3);
});

test('Buscar servicios por nombre', () => {
  const resultado = filtrarServicios(
    servicios,
    'Todos',
    'cumpleaños'
  );

  assert.equal(resultado.length, 1);
  assert.equal(resultado[0].nombre, 'Decoración de cumpleaños');
});

test('Mostrar lista vacía si no hay coincidencias', () => {
  const resultado = filtrarServicios(
    servicios,
    'Todos',
    'computadoras'
  );

  assert.equal(resultado.length, 0);
});

test('Filtrar detalles personalizados', () => {
  const resultado = filtrarServicios(
    servicios,
    'Detalles personalizados',
    ''
  );

  assert.equal(resultado.length, 1);
  assert.equal(resultado[0].nombre, 'Souvenirs personalizados');
});

test('Categorizar un servicio de asesoramiento', () => {
  const categoria = categorizarServicio(servicios[2]);

  assert.equal(categoria, 'Asesoramiento');
});
