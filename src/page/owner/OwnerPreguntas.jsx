import AdminCrudPage from '../../components/admin/AdminCrudPage';
import { preguntasService } from '../../services/preguntas.service';
const fields = [
  { name: 'pregunta', label: 'Pregunta', required: true, fullWidth: true, maxLength: 250 },
  { name: 'respuesta', label: 'Respuesta', type: 'textarea', required: true, fullWidth: true, maxLength: 5000, rows: 6 },
  { name: 'orden', label: 'Orden interno', type: 'number', min: 0, hidden: true, auto: true },
  { name: 'activo', label: 'Publicada', type: 'checkbox' },
];
const initialValues = { pregunta: '', respuesta: '', orden: 0, activo: true };
export default function OwnerPreguntas() { return <AdminCrudPage title="Preguntas frecuentes" description="Administrá las preguntas y respuestas que aparecen en el sitio público." service={preguntasService} queryKey={['preguntas', 'todas']} fields={fields} initialValues={initialValues} emptyMessage="Todavía no cargaste preguntas frecuentes." />; }
