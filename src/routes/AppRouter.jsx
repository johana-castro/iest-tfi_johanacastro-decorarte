import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import PublicacionGuard from '../components/public/PublicacionGuard';
import AuthLayout from '../layouts/AuthLayout';
import OwnerLayout from '../layouts/OwnerLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import NotFound from '../page/error/NotFound';
import AccessDenied from '../page/error/AccessDenied';
import LoginPage from '../page/auth/LoginPage';
import CatalogoPage from '../page/public/CatalogoPage';
import HomePage from '../page/public/HomePage';
import NosotrosPage from '../page/public/NosotrosPage';
import ServiciosPage from '../page/public/ServiciosPage';
import PreguntasFrecuentesPage from '../page/public/PreguntasFrecuentesPage';
import ContactoPage from '../page/public/ContactoPage';
import AdminDashboard from '../page/admin/AdminDashboard';
import AdminProductos from '../page/admin/AdminProductos';
import AdminServicios from '../page/admin/AdminServicios';
import AdminPreguntas from '../page/admin/AdminPreguntas';
import AdminConfiguracion from '../page/admin/AdminConfiguracion';
import AdminPerfilNegocio from '../page/admin/AdminPerfilNegocio';
import OwnerDashboard from '../page/owner/OwnerDashboard';
import OwnerProductos from '../page/owner/OwnerProductos';
import OwnerServicios from '../page/owner/OwnerServicios';
import OwnerPreguntas from '../page/owner/OwnerPreguntas';
import OwnerCuenta from '../page/owner/OwnerCuenta';

export default function AppRouter() {
  return <BrowserRouter>
    <Routes>
      <Route element={<PublicacionGuard />}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentesPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/presupuesto" element={<Navigate to="/contacto#presupuesto" replace />} />
      </Route>

      </Route>

      <Route element={<PublicOnlyRoute />}><Route element={<AuthLayout />}><Route path="/login" element={<LoginPage />} /></Route></Route>

      <Route element={<ProtectedRoute allowedRoles={['administrador']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="servicios" element={<AdminServicios />} />
          <Route path="preguntas-frecuentes" element={<AdminPreguntas />} />
          <Route path="configuracion" element={<AdminConfiguracion />} />
          <Route path="dueno" element={<Navigate to="/admin/configuracion" replace />} />
          <Route path="perfil-negocio" element={<AdminPerfilNegocio />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['dueno']} />}>
        <Route path="/dueno" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="productos" element={<OwnerProductos />} />
          <Route path="servicios" element={<OwnerServicios />} />
          <Route path="preguntas-frecuentes" element={<OwnerPreguntas />} />
          <Route path="cuenta" element={<OwnerCuenta />} />
          <Route path="perfil-negocio" element={<Navigate to="/dueno/cuenta" replace />} />
        </Route>
      </Route>

      <Route path="/acceso-denegado" element={<AccessDenied />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>;
}
