
import { FiAward, FiImage, FiInfo } from 'react-icons/fi';
import AdminPageHeader from '../../components/admin/AdminPageHeader';

export default function AdminPerfilNegocio() {
  const secciones = [
    {
      icon: <FiAward size={22} />,
      title: 'Identidad comercial',
      description: 'Nombre comercial, descripción, historia y presentación.',
    },
    {
      icon: <FiImage size={22} />,
      title: 'Identidad visual',
      description: 'Logo, imágenes principales, fotografías y video.',
    },
    {
      icon: <FiInfo size={22} />,
      title: 'Información de contacto',
      description: 'WhatsApp, correo, dirección, horarios y redes sociales.',
    },
  ];

  return (
    <section>
      <AdminPageHeader
        title="Perfil del negocio"
        description="Información comercial que se mostrará en las páginas públicas de DecorArte."
      />

      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-relaxed text-blue-800">
        Este módulo tendrá su propia tabla informacion_negocio. No utilizaremos
        perfiles ni configuracion_sitio para almacenar información comercial.
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {secciones.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-neutral-200 bg-white p-6"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              {item.icon}
            </div>
            <h2 className="font-bold text-neutral-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
        <h2 className="text-lg font-bold text-neutral-900">
          Estructura comercial pendiente de conexión
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-500">
          La interfaz de edición se habilitará cuando creemos la tabla y sus
          políticas RLS. Así podremos guardar y administrar los datos
          comerciales sin mezclar responsabilidades.
        </p>
      </div>
    </section>
  );
}
