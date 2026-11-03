
import { negocio } from '../config/negocio';

export function crearEnlaceWhatsApp(mensaje) {
  const numero = negocio.whatsapp.replace(/\D/g, '');

  if (!numero) {
    return null;
  }

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export function abrirWhatsApp(mensaje) {
  const enlace = crearEnlaceWhatsApp(mensaje);

  if (!enlace) {
    return false;
  }

  window.open(enlace, '_blank', 'noopener,noreferrer');
  return true;
}
