import test from 'node:test';
import assert from 'node:assert/strict';
import { agregarProducto, actualizarCantidad, calcularCantidad, calcularTotal, crearMensajePedido } from '../src/utils/carrito.js';

const producto = { id: 'p-1', nombre: 'Souvenir artesanal', precio: 1250, moneda: 'ARS' };
test('agrega un producto nuevo con cantidad uno', () => {
  const resultado = agregarProducto([], producto);
  assert.equal(resultado.length, 1);
  assert.equal(resultado[0].cantidad, 1);
});
test('consolida productos repetidos', () => {
  const uno = agregarProducto([], producto);
  const dos = agregarProducto(uno, producto);
  assert.equal(dos.length, 1);
  assert.equal(dos[0].cantidad, 2);
});
test('actualiza cantidad y limita a 99', () => {
  const items = agregarProducto([], producto);
  assert.equal(actualizarCantidad(items, 'p-1', 120)[0].cantidad, 99);
});
test('elimina el producto al reducir cantidad a cero', () => {
  const items = agregarProducto([], producto);
  assert.deepEqual(actualizarCantidad(items, 'p-1', 0), []);
});
test('calcula cantidad total y total estimado', () => {
  const items = agregarProducto(agregarProducto([], producto), { ...producto, id: 'p-2', precio: 500 });
  assert.equal(calcularCantidad(items), 2);
  assert.equal(calcularTotal(items), 1750);
});
test('el mensaje aclara que stock y disponibilidad deben confirmarse', () => {
  const mensaje = crearMensajePedido(agregarProducto([], producto));
  assert.match(mensaje, /Souvenir artesanal x 1/);
  assert.match(mensaje, /confirmación de stock y disponibilidad/);
});
test('el total queda a confirmar si algún producto no tiene precio', () => {
  const mensaje = crearMensajePedido(agregarProducto([], { id: 'p-sin-precio', nombre: 'Adorno personalizado', precio: null }));
  assert.match(mensaje, /Total estimado: A confirmar/);
  assert.match(mensaje, /Consultar precio/);
});
