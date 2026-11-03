import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiBriefcase,
  FiHelpCircle,
  FiSettings,
  FiShoppingBag,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useAuth } from "../hook/useAuth";
const links = [
  { to: "/admin", label: "Dashboard", icon: FiHome, end: true },
  { to: "/admin/productos", label: "Productos", icon: FiPackage },
  { to: "/admin/servicios", label: "Servicios", icon: FiBriefcase },
  { to: "/admin/preguntas-frecuentes", label: "Preguntas", icon: FiHelpCircle },
  {
    to: "/admin/perfil-negocio",
    label: "Perfil del negocio",
    icon: FiShoppingBag,
  },
  { to: "/admin/configuracion", label: "Configuración", icon: FiSettings },
];
export default function AdminLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("decorarte-admin-sidebar") === "closed",
  );
  const toggle = () =>
    setCollapsed((v) => {
      localStorage.setItem("decorarte-admin-sidebar", v ? "open" : "closed");
      return !v;
    });
  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) navigate("/login", { replace: true });
  };
  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
        <NavLink to="/admin" className="admin-sidebar-brand">
          <img src="/marca/icono-decorarte.png" alt="" />
          <span>DecorArte</span>
        </NavLink>
        <button
          className="sidebar-toggle"
          onClick={toggle}
          title={collapsed ? "Expandir menú" : "Contraer menú"}
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          {!collapsed && <span>Contraer menú</span>}
        </button>
        <nav>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={collapsed ? label : undefined}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          className="sidebar-logout"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <FiLogOut />
          <span>Cerrar sesión</span>
        </button>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="text-sm font-semibold">Administración</p>
            <p className="text-xs text-neutral-500">
              {profile?.nombre_completo || "Administrador"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-rose-100 px-3 py-2 text-xs font-semibold text-rose-700 md:hidden"
            aria-label="Cerrar sesión"
          >
            <FiLogOut />
          </button>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
        <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-rose-100 bg-white py-2 md:hidden">
          {[links[0], links[1], links[2], links[3], links[5]].map(
            ({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 text-[10px] ${isActive ? "text-[#a45d7d]" : "text-neutral-500"}`
                }
              >
                <Icon size={19} />
                <span>{label}</span>
              </NavLink>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
