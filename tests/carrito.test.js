
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  agregarProducto,
  actualizarCantidad,
  calcularCantidad,
  calcularTotal,
  crearMensajePedido
} from '../src/utils/carrito.js';

const producto = {
  id: 1,
  nombre: 'Souvenir artesanal',
  precio: 5000,
  moneda: 'ARS'
};

test('Agregar un producto al carrito', () => {
  const carrito = agregarProducto([], producto);

  assert.equal(carrito.length, 1);
  assert.equal(carrito[0].cantidad, 1);
});

test('Agregar dos veces el mismo producto', () => {
  let carrito = agregarProducto([], producto);
  carrito = agregarProducto(carrito, producto);

  assert.equal(carrito.length, 1);
  assert.equal(carrito[0].cantidad, 2);
});

test('Calcular el total del carrito', () => {
  const carrito = [
    { ...producto, cantidad: 2 }
  ];

  assert.equal(calcularTotal(carrito), 10000);
  assert.equal(calcularCantidad(carrito), 2);
});

test('Actualizar la cantidad de un producto', () => {
  const carrito = agregarProducto([], producto);
  const actualizado = actualizarCantidad(carrito, 1, 3);

  assert.equal(actualizado[0].cantidad, 3);
});

test('Eliminar un producto cuando su cantidad es cero', () => {
  const carrito = agregarProducto([], producto);
  const actualizado = actualizarCantidad(carrito, 1, 0);

  assert.equal(actualizado.length, 0);
});

test('No permitir más de 99 unidades', () => {
  const carrito = agregarProducto([], producto);
  const actualizado = actualizarCantidad(carrito, 1, 120);

  assert.equal(actualizado[0].cantidad, 99);
});

test('Crear mensaje de pedido para WhatsApp', () => {
  const carrito = agregarProducto([], producto);
  const mensaje = crearMensajePedido(carrito);

  assert.ok(mensaje.includes('Souvenir artesanal'));
  assert.ok(mensaje.includes('Total estimado'));
  assert.ok(mensaje.includes('confirmación de stock'));
});
