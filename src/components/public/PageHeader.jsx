/** Imágenes opcionales: public/media/hero-nosotros.webp, hero-productos.webp, etc. */
export default function PageHeader({ etiqueta, titulo, imagen }) {
  // Para agregar una imagen, pasá imagen="./media/archivo.webp" desde cada página.
  const fondo = imagen || null;
  return (
    <section className={`page-hero ${fondo ? "page-hero--image" : ""}`}
      style={fondo ? { backgroundImage: `linear-gradient(90deg, rgba(43,29,37,.77), rgba(43,29,37,.40)), url("${fondo}")` } : undefined}>
      <div className="section-container">
        {etiqueta && <span className="eyebrow">{etiqueta}</span>}
        <h1 className="display-title">{titulo}</h1>
      </div>
    </section>
  );
}
