
import { FaWhatsapp } from 'react-icons/fa';
import { crearEnlaceWhatsApp } from '../../utils/whatsapp';

export default function WhatsAppButton({
  mensaje = 'Hola DecorArte, quisiera realizar una consulta.',
  texto = 'Consultar por WhatsApp',
  className = '',
}) {
  const enlace = crearEnlaceWhatsApp(mensaje);

  return (
    <a
      href={enlace || '/contacto'}
      target={enlace ? '_blank' : undefined}
      rel={enlace ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 ${className}`}
    >
      <FaWhatsapp size={20} />
      {texto}
    </a>
  );
}
