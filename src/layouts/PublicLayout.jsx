import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import AccionesFlotantes from "../components/public/AccionesFlotantes";
import { negocio } from "../config/negocio";

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/catalogo", label: "Productos" },
  { to: "/servicios", label: "Servicios" },
  { to: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { to: "/contacto", label: "Contacto" },
];

const claseLink = ({ isActive }) =>
  `public-nav-link ${isActive ? "active" : ""}`;

export default function PublicLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  return (
    <div className="site-shell">
      <header className="public-header">
        <div className="public-header-inner">
          <Link to="/" className="brand-lockup" aria-label="DecorArte, inicio">
            <img
              src="/marca/logo-decorarte.png"
              alt="DecorArte — Las ideas también se decoran"
            />
            <span className="brand-fallback">DecorArte</span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={claseLink}>
                {label}
              </NavLink>
            ))}
           
          </nav>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          >
            {menuAbierto ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {menuAbierto && (
          <nav className="mobile-nav">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuAbierto(false)}
                className={claseLink}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main className="public-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/marca/logo-decorarte.png" alt="Logo DecorArte" />
            <p>Manualidades y decoración hechas con dedicación.</p>
          </div>
          <div>
            <h3>Explorá</h3>
            <Link to="/">Inicio</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/catalogo">Productos</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/preguntas-frecuentes">Preguntas frecuentes</Link>
          </div>
          <div>
            <h3>¿Hablamos?</h3>
            <Link to="/contacto">Contacto</Link>
            {negocio.whatsapp && (
              <a
                href={`https://wa.me/${negocio.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            )}
            {negocio.email && (
              <a href={`mailto:${negocio.email}`}>{negocio.email}</a>
            )}
            {negocio.instagram && (
              <a href={negocio.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            )}
            <Link to="/login">Acceso privado</Link>
          </div>
          <div>
            <h3>DecorArte</h3>
            <p>
              Propuestas artesanales, detalles personalizados y decoración para
              momentos especiales.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} DecorArte. Todos los derechos
            reservados.
          </span>
          <span>
            Desarrollo y diseño: <strong>JMC</strong>
          </span>
        </div>
      </footer>
      <AccionesFlotantes />
    </div>
  );
}
