import AdminCrudPage from '../../components/admin/AdminCrudPage';
import { serviciosService } from '../../services/servicios.service';
const fields = [
  { name: 'nombre', label: 'Nombre', required: true },
  { name: 'slug', label: 'URL interna', required: true, hidden: true, auto: true },
  { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true },
  { name: 'precio_desde', label: 'Precio desde', type: 'number', min: 0, step: '0.01', nullable: true },
  { name: 'moneda', label: 'Moneda', required: true },
  { name: 'imagen_ruta', label: 'Imagen', type: 'image', nullable: true, fullWidth: true },
  { name: 'orden', label: 'Orden interno', type: 'number', min: 0, hidden: true, auto: true },
  { name: 'activo', label: 'Publicado', type: 'checkbox' },
  { name: 'destacado', label: 'Servicio destacado', type: 'checkbox' },
];
const initialValues = { nombre: '', slug: '', descripcion: '', precio_desde: '', moneda: 'ARS', imagen_ruta: '', orden: 0, activo: true, destacado: false };
export default function OwnerServicios() { return <AdminCrudPage title="Mis servicios" description="Administrá las propuestas y servicios que ofrece DecorArte." imageFolder="servicios" service={serviciosService} queryKey={['servicios', 'todos']} fields={fields} initialValues={initialValues} emptyMessage="Todavía no cargaste servicios." />; }
