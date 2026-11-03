
import { FiHeart, FiAward, FiFeather, FiTarget } from 'react-icons/fi';
import PageHeader from '../../components/public/PageHeader';
import WhatsAppButton from '../../components/public/WhatsAppButton';

export default function NosotrosPage() {
  const valores = [
    {
      icon: <FiHeart size={25} />,
      titulo: 'Pasión por crear',
      texto: 'Disfrutamos transformar ideas en detalles especiales.',
    },
    {
      icon: <FiFeather size={25} />,
      titulo: 'Trabajo artesanal',
      texto: 'Valoramos los procesos creativos y el cuidado de cada pieza.',
    },
    {
      icon: <FiAward size={25} />,
      titulo: 'Atención personalizada',
      texto: 'Cada propuesta se adapta a las necesidades de cada cliente.',
    },
    {
      icon: <FiTarget size={25} />,
      titulo: 'Atención al detalle',
      texto: 'Buscamos que cada elemento tenga sentido dentro del conjunto.',
    },
  ];

  return (
    <main className="bg-stone-50">
      <PageHeader
        imagen="/media/nosotros-decorarte.webp"
        etiqueta="Conocé nuestra esencia"
        titulo="Sobre DecorArte"
        descripcion="Un espacio dedicado a la decoración, las manualidades y las creaciones artesanales."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
            Nuestra esencia
          </p>

          <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
            Cada detalle cuenta una historia.
          </h2>

          <p className="mt-6 leading-relaxed text-neutral-600">
            En DecorArte nos dedicamos a crear propuestas de decoración,
            adornos, regalos y trabajos artesanales pensados para acompañar
            momentos importantes.
          </p>

          <p className="mt-4 leading-relaxed text-neutral-600">
            Nos interesa escuchar cada idea, conocer el estilo que buscás
            y convertirlo en una propuesta personalizada.
          </p>

          <div className="mt-8">
            <WhatsAppButton texto="Hablemos de tu idea" />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-[0_18px_48px_rgba(78,50,61,.13)]"><img src="/media/nosotros-decorarte.webp" alt="Espacio de trabajo artesanal de DecorArte con herramientas y materiales para crear adornos" loading="lazy" className="h-full min-h-[320px] w-full object-cover"/></div>
      </section>

      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
              Lo que nos representa
            </p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-900">
              Nuestros valores
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((valor) => (
              <article
                key={valor.titulo}
                className="rounded-2xl border border-stone-200 p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  {valor.icon}
                </div>

                <h3 className="font-bold text-neutral-900">
                  {valor.titulo}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {valor.texto}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
