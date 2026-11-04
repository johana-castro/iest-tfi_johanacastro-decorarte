
import test from 'node:test';
import assert from 'node:assert/strict';

import { loginSchema } from '../src/features/auth/login.schema.js';

test('Aceptar datos de acceso con formato válido', () => {
  const resultado = loginSchema.safeParse({
    email: 'admin@ejemplo.com',
    password: 'claveDePrueba123'
  });

  assert.equal(resultado.success, true);
});

test('Rechazar un correo electrónico inválido', () => {
  const resultado = loginSchema.safeParse({
    email: 'correo-invalido',
    password: 'claveDePrueba123'
  });

  assert.equal(resultado.success, false);
});

test('Rechazar una contraseña vacía', () => {
  const resultado = loginSchema.safeParse({
    email: 'admin@ejemplo.com',
    password: ''
  });

  assert.equal(resultado.success, false);
});

test('Rechazar un correo vacío', () => {
  const resultado = loginSchema.safeParse({
    email: '',
    password: 'claveDePrueba123'
  });

  assert.equal(resultado.success, false);
});
