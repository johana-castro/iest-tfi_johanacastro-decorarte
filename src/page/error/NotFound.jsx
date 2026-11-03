
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FFFAF7] px-5 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#F7E6ED] text-[#745B6C]">
          <FiSearch size={48} />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#A45D7D]">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold text-[#373334] md:text-6xl">
          Página no encontrada
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-relaxed text-neutral-500">
          Parece que esta página no existe, fue movida o la dirección
          que ingresaste no es correcta.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#373334] px-6 py-3 font-bold text-white transition hover:bg-[#745B6C]"
          >
            <FiHome />
            Volver al inicio
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-700 transition hover:bg-white"
          >
            <FiArrowLeft />
            Volver atrás
          </button>
        </div>

        <p className="mt-12 text-sm font-semibold tracking-widest text-neutral-400">
          DECORARTE
        </p>
      </div>
    </main>
  );
}
