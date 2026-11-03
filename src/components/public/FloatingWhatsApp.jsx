
import { FaWhatsapp } from 'react-icons/fa';
import { crearEnlaceWhatsApp } from '../../utils/whatsapp';

export default function FloatingWhatsApp() {
  const enlace = crearEnlaceWhatsApp(
    'Hola DecorArte, quisiera realizar una consulta.'
  );

  if (!enlace) return null;

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a DecorArte por WhatsApp"
      title="Contactar por WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110 hover:bg-[#20bd5a] md:bottom-8 md:right-8"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}
