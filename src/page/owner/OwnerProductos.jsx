import AdminCrudPage from '../../components/admin/AdminCrudPage';
import { productosService } from '../../services/productos.service';
const fields = [
  { name: 'nombre', label: 'Nombre', required: true },
  { name: 'slug', label: 'URL interna', required: true, hidden: true, auto: true },
  { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true },
  { name: 'precio', label: 'Precio', type: 'number', min: 0, step: '0.01', nullable: true },
  { name: 'moneda', label: 'Moneda', required: true },
  { name: 'imagen_ruta', label: 'Imagen', type: 'image', nullable: true, fullWidth: true },
  { name: 'orden', label: 'Orden interno', type: 'number', min: 0, hidden: true, auto: true },
  { name: 'activo', label: 'Publicado', type: 'checkbox' },
  { name: 'destacado', label: 'Producto destacado', type: 'checkbox' },
];
const initialValues = { nombre: '', slug: '', descripcion: '', precio: '', moneda: 'ARS', imagen_ruta: '', orden: 0, activo: true, destacado: false };
export default function OwnerProductos() { return <AdminCrudPage title="Mis productos" description="Creá, editá y administrá los productos del catálogo de DecorArte." imageFolder="productos" service={productosService} queryKey={['productos', 'todos']} fields={fields} initialValues={initialValues} emptyMessage="Todavía no cargaste productos." />; }
