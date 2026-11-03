
import { useState } from 'react';
import { FiMail, FiMessageCircle, FiMapPin, FiInstagram, FiFacebook} from 'react-icons/fi';

import { negocio } from '../../config/negocio';
import { abrirWhatsApp } from '../../utils/whatsapp';
import PageHeader from '../../components/public/PageHeader';
import PresupuestoPage from './PresupuestoPage';

export default function ContactoPage() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  function actualizarCampo(e) {
    setFormulario((actual) => ({
      ...actual,
      [e.target.name]: e.target.value,
    }));

    setError('');
    setEnviado(false);
  }

  function enviarFormulario(e) {
    e.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.email.trim() ||
      !formulario.asunto.trim() ||
      !formulario.mensaje.trim()
    ) {
      setError('Completá todos los campos.');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formulario.email
    );

    if (!emailValido) {
      setError('Ingresá un correo electrónico válido.');
      return;
    }

    const mensaje = [
      'Hola DecorArte, quiero realizar una consulta.',
      '',
      `Nombre: ${formulario.nombre}`,
      `Correo: ${formulario.email}`,
      `Asunto: ${formulario.asunto}`,
      '',
      'Mensaje:',
      formulario.mensaje,
    ].join('\n');

    const abierto = abrirWhatsApp(mensaje);

    if (!abierto) {
      setError(
        'Todavía no está configurado el número de WhatsApp del negocio.'
      );
      return;
    }

    setEnviado(true);
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <PageHeader
        etiqueta="Estamos para escucharte"
        titulo="Contacto"
        descripcion="Contanos qué necesitás, qué estás buscando o qué idea te gustaría hacer realidad."
        imagen="/media/hero-contacto.webp"
      />

      <section className="section-container contact-layout py-section contact-minimal">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Hablemos
          </h2>

          <p className="mt-4 leading-relaxed text-neutral-600">
            Podés enviarnos tu consulta a través del formulario.
            Te prepararemos un mensaje para continuar la conversación
            por WhatsApp.
          </p>

          <div className="mt-6 space-y-4">
            {negocio.whatsapp && (
              <a
                href={`https://wa.me/${negocio.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-neutral-700 hover:text-green-700"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <FiMessageCircle size={22} />
                </span>
                <span>
                  <strong className="block">WhatsApp</strong>
                  <small>Escribinos directamente</small>
                </span>
              </a>
            )}

            {negocio.email && (
              <a
                href={`mailto:${negocio.email}`}
                className="flex items-center gap-4 text-neutral-700 hover:text-amber-700"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <FiMail size={22} />
                </span>
                <span>
                  <strong className="block">Correo electrónico</strong>
                  <small>{negocio.email}</small>
                </span>
              </a>
            )}

            {negocio.instagram && (
              <a
                href={negocio.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-neutral-700 hover:text-amber-700"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <FiInstagram size={22} />
                </span>
                <span>
                  <strong className="block">Instagram</strong>
                  <small>Seguinos en redes</small>
                </span>
              </a>
            )}
            {negocio.facebook && (
              <a
                href={negocio.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-neutral-700 hover:text-amber-700"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <FiFacebook size={22} />
                </span>
                <span>
                  <strong className="block">Facebook</strong>
                  <small>Seguinos en redes</small>
                </span>
              </a>
            )}


            {negocio.ubicacion && (
              <div className="flex items-center gap-4 text-neutral-700">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <FiMapPin size={22} />
                </span>
                <span>
                  <strong className="block">Ubicación</strong>
                  <small>{negocio.ubicacion}</small>
                </span>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={enviarFormulario}
          className="space-y-3 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-7"
        >
          <h2 className="text-xl font-bold text-neutral-900">
            Enviá tu consulta
          </h2>

          <div>
            <label className="mb-1 block text-sm font-semibold text-neutral-700">
              Nombre
            </label>
            <input
              name="nombre"
              value={formulario.nombre}
              onChange={actualizarCampo}
              maxLength={100}
              placeholder="Tu nombre"
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 outline-none focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-neutral-700">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={actualizarCampo}
              maxLength={150}
              placeholder="correo@ejemplo.com"
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 outline-none focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-neutral-700">
              Asunto
            </label>
            <input
              name="asunto"
              value={formulario.asunto}
              onChange={actualizarCampo}
              maxLength={150}
              placeholder="¿Sobre qué querés consultar?"
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 outline-none focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-neutral-700">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              value={formulario.mensaje}
              onChange={actualizarCampo}
              maxLength={3000}
              rows={3}
              placeholder="Contanos cómo podemos ayudarte..."
              className="w-full resize-y rounded-xl border border-neutral-200 px-4 py-2.5 outline-none focus:border-rose-500"
              required
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {enviado && (
            <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
              Se abrió WhatsApp con tu consulta preparada. Revisá el mensaje y envialo.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-neutral-950 px-6 py-4 font-bold text-white transition hover:bg-amber-600"
          >
            Preparar mensaje por WhatsApp
          </button>

          <p className="text-xs leading-relaxed text-neutral-400">
            El mensaje se prepara en WhatsApp. No se almacena en esta página.
          </p>
        </form>
      </section>
      <div id="presupuesto" className="contact-budget"><PresupuestoPage integrado /></div>
    </main>
  );
}
