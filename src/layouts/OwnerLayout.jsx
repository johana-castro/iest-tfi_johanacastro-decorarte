import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FiHome,
  FiPackage,
  FiBriefcase,
  FiHelpCircle,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useAuth } from "../hook/useAuth";
import { supabase } from "../config/supabase";
const links = [
  { to: "/dueno", label: "Panel", icon: FiHome, end: true },
  { to: "/dueno/productos", label: "Productos", icon: FiPackage },
  { to: "/dueno/servicios", label: "Servicios", icon: FiBriefcase },
  { to: "/dueno/preguntas-frecuentes", label: "Preguntas", icon: FiHelpCircle },
  { to: "/dueno/cuenta", label: "Mi cuenta", icon: FiUser },
];
async function consultarPublicacion() {
  const { data, error } = await supabase
    .from("configuracion_sitio")
    .select("sitio_activo")
    .eq("id", 1)
    .single();
  if (error) throw error;
  return data.sitio_activo;
}
export default function OwnerLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("decorarte-owner-sidebar") === "closed",
  );
  const publicacion = useQuery({
    queryKey: ["configuracion-sitio", "owner-access"],
    queryFn: consultarPublicacion,
    refetchOnWindowFocus: true,
    refetchInterval: 15000,
    staleTime: 0,
  });
  const toggle = () =>
    setCollapsed((v) => {
      localStorage.setItem("decorarte-owner-sidebar", v ? "open" : "closed");
      return !v;
    });
  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) navigate("/login", { replace: true });
  };
  if (publicacion.isLoading)
    return (
      <main className="flex min-h-screen items-center justify-center text-sm text-neutral-500">
        Verificando disponibilidad del panel...
      </main>
    );
  if (publicacion.isError || publicacion.data !== true)
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-5">
        <section className="max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold">
            Panel temporalmente no disponible
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            El administrador deshabilitó temporalmente el sitio. Mientras
            permanezca despublicado, la gestión estará pausada.
          </p>
          <button
            onClick={handleLogout}
            className="mt-6 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Cerrar sesión
          </button>
        </section>
      </main>
    );
  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
        <NavLink to="/dueno" className="admin-sidebar-brand">
          <img src="./marca/icono-decorarte.webp" alt="" />
          <span>DecorArte</span>
        </NavLink>
        <button
          className="sidebar-toggle"
          onClick={toggle}
          title={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          <span>{collapsed ? "Expandir" : "Contraer menú"}</span>
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
            <p className="text-sm font-semibold">Panel de gestión</p>
            <p className="text-xs text-neutral-500">
              {profile?.nombre_completo || "Dueño"}
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
          {links.map(({ to, label, icon: Icon, end }) => (
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
          ))}
        </nav>
      </div>
    </div>
  );
}
