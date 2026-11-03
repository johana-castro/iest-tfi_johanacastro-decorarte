
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiClipboard, FiCalendar, FiUsers } from 'react-icons/fi';

import { abrirWhatsApp } from '../../utils/whatsapp';
import PageHeader from '../../components/public/PageHeader';

const valoresIniciales = {
  nombre: '',
  telefono: '',
  email: '',
  servicio: '',
  fecha: '',
  invitados: '',
  lugar: '',
  detalles: '',
};

export default function PresupuestoPage({ integrado = false } = {}) {
  const Contenedor = integrado ? 'section' : 'main';
  const [searchParams] = useSearchParams();

  const [formulario, setFormulario] = useState({
    ...valoresIniciales,
    servicio: searchParams.get('servicio') || '',
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

  function enviarPresupuesto(e) {
    e.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.telefono.trim() ||
      !formulario.servicio.trim() ||
      !formulario.detalles.trim()
    ) {
      setError('Completá los campos obligatorios.');
      return;
    }

    const mensaje = [
      '¡Hola DecorArte! Quisiera solicitar un presupuesto.',
      '',
      `Nombre: ${formulario.nombre}`,
      `Teléfono: ${formulario.telefono}`,
      `Correo: ${formulario.email || 'No indicado'}`,
      `Servicio: ${formulario.servicio}`,
      `Fecha del evento: ${formulario.fecha || 'A definir'}`,
      `Cantidad de invitados: ${formulario.invitados || 'A definir'}`,
      `Lugar: ${formulario.lugar || 'A definir'}`,
      '',
      'Detalles de la propuesta:',
      formulario.detalles,
      '',
      'Quedo a la espera de su respuesta. ¡Muchas gracias!',
    ].join('\n');

    const abierto = abrirWhatsApp(mensaje);

    if (!abierto) {
      setError(
        'No está configurado el número de WhatsApp. Contactá al administrador del sitio.'
      );
      return;
    }

    setEnviado(true);
  }

  return (
    <Contenedor className={integrado ? "budget-integrated" : "min-h-screen"}>
      {!integrado && <PageHeader
        etiqueta="Contanos tu idea"
        titulo="Solicitá tu presupuesto"
        descripcion="Completá los datos para que podamos conocer tu proyecto y preparar una propuesta."
      />}

      <section className={integrado ? "budget-section" : "mx-auto max-w-3xl px-5 py-16"}>
        <div className="mb-8 flex items-start gap-4 rounded-2xl border border-rose-200 bg-[#f4e6ed] p-5">
          <FiClipboard className="mt-1 shrink-0 text-[#853d60]" size={26} />
          <div>
            <h2 className="font-bold text-neutral-900">
              ¿Cómo funciona?
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              Recibiremos tu consulta mediante WhatsApp. Luego podremos
              conversar sobre los detalles, disponibilidad y presupuesto final.
              Enviar una consulta no confirma una reserva.
            </p>
          </div>
        </div>

        <form
          onSubmit={enviarPresupuesto}
          className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-9"
        >
          <h2 className="text-xl font-bold text-neutral-900">
            Solicitar presupuesto
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Nombre *
              </label>
              <input
                name="nombre"
                value={formulario.nombre}
                onChange={actualizarCampo}
                maxLength={100}
                required
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Teléfono *
              </label>
              <input
                name="telefono"
                value={formulario.telefono}
                onChange={actualizarCampo}
                maxLength={30}
                required
                placeholder="Tu número de contacto"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Correo electrónico (opcional)
              </label>
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={actualizarCampo}
                maxLength={150}
                placeholder="correo@ejemplo.com"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-6">
            <h2 className="text-xl font-bold text-neutral-900">
              Detalles del proyecto
            </h2>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              ¿Qué necesitás? *
            </label>
            <select
              name="servicio"
              value={formulario.servicio}
              onChange={actualizarCampo}
              required
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none focus:border-amber-500"
            >
              <option value="">Seleccioná una opción</option>
              <option value="Decoración de cumpleaños">Decoración de cumpleaños</option>
              <option value="Ambientación de mesas y espacios">Ambientación de mesas y espacios</option>
              <option value="Bautismos y baby showers">Bautismos y baby showers</option>
              <option value="Aniversarios y celebraciones">Aniversarios y celebraciones</option>
              <option value="Detalles personalizados">Detalles personalizados</option>
              <option value="Souvenirs">Souvenirs</option>
              <option value="Regalos artesanales">Regalos artesanales</option>
              <option value="Decoración del hogar">Decoración del hogar</option>
              <option value="Otro proyecto">Otro proyecto</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-700">
                <FiCalendar /> Fecha aproximada
              </label>
              <input
                type="date"
                name="fecha"
                value={formulario.fecha}
                onChange={actualizarCampo}
                min={new Date().toLocaleDateString('en-CA')}
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-700">
                <FiUsers /> Cantidad de invitados
              </label>
              <input
                type="number"
                name="invitados"
                value={formulario.invitados}
                onChange={actualizarCampo}
                min="1"
                max="10000"
                placeholder="Ej. 50"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Lugar o localidad
            </label>
            <input
              name="lugar"
              value={formulario.lugar}
              onChange={actualizarCampo}
              maxLength={200}
              placeholder="¿Dónde se realizará?"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Contanos qué estás imaginando *
            </label>
            <textarea
              name="detalles"
              value={formulario.detalles}
              onChange={actualizarCampo}
              required
              minLength={10}
              maxLength={3000}
              rows={6}
              placeholder="Describí tu idea, colores, temática, cantidades y cualquier detalle que consideres importante..."
              className="w-full resize-y rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {enviado && (
            <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
              WhatsApp se abrió con tu solicitud preparada. Revisá los datos y enviá el mensaje.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-amber-500 px-6 py-4 font-bold text-neutral-950 transition hover:bg-amber-400"
          >
            Enviar solicitud por WhatsApp
          </button>

          <p className="text-center text-xs text-neutral-400">
            La solicitud no se almacena en la base de datos ni confirma una reserva.
          </p>
        </form>
      </section>
    </Contenedor>
  );
}
