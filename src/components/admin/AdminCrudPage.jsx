import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiEyeOff,
  FiX, FiSave, FiAlertCircle, FiImage, FiUploadCloud,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import AdminPageHeader from './AdminPageHeader';
import { storageService } from '../../services/storage.service';
import PageSkeleton from '../ui/PageSkeleton';

function crearSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminCrudPage({
  title, description, service, queryKey, fields, initialValues,
  emptyMessage, imageFolder,
}) {
  const queryClient = useQueryClient();
  const [busqueda, setBusqueda] = useState('');
  const [registroEditando, setRegistroEditando] = useState(null);
  const [formulario, setFormulario] = useState(initialValues);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [urlTemporal, setUrlTemporal] = useState('');

  const campoImagen = fields.find((field) => field.type === 'image');
  const nombreCampoImagen = campoImagen?.name;
  const rutaImagenActual = nombreCampoImagen ? formulario[nombreCampoImagen] : null;

  useEffect(() => {
    if (!archivoImagen) {
      setUrlTemporal('');
      return undefined;
    }
    const url = URL.createObjectURL(archivoImagen);
    setUrlTemporal(url);
    return () => URL.revokeObjectURL(url);
  }, [archivoImagen]);

  const {
    data: registros = [], isLoading, isError, error,
  } = useQuery({ queryKey, queryFn: () => service.obtenerTodos() });

  const invalidar = async () => {
    await queryClient.invalidateQueries({ queryKey });
    await queryClient.invalidateQueries({ queryKey: [queryKey[0], 'publicos'] });
    if (queryKey[0] === 'preguntas') {
      await queryClient.invalidateQueries({ queryKey: ['preguntas-frecuentes'] });
    }
  };

  const guardarMutation = useMutation({
    mutationFn: async () => {
      const datos = {};
      fields.forEach((field) => {
        if (field.type === 'image' || field.hidden || field.auto) return;
        const value = formulario[field.name];
        if (field.type === 'number') {
          datos[field.name] = value === '' || value === null ? null : Number(value);
        } else if (field.type === 'checkbox') {
          datos[field.name] = Boolean(value);
        } else {
          datos[field.name] = value === '' && field.nullable ? null : value;
        }
      });

      if (fields.some((field) => field.name === 'slug')) datos.slug = crearSlug(formulario.nombre || 'nuevo-producto');
      if (fields.some((field) => field.name === 'orden')) datos.orden = registroEditando?.orden ?? (registros.reduce((max, item) => Math.max(max, Number(item.orden) || 0), -1) + 1);
      const rutaAnterior = registroEditando?.[nombreCampoImagen] || null;
      let rutaNueva = rutaImagenActual || null;
      let imagenSubidaEnEstaOperacion = null;

      try {
        if (archivoImagen) {
          if (!imageFolder || !nombreCampoImagen) {
            throw new Error('No se configuró la carpeta de Storage para esta imagen.');
          }
          rutaNueva = await storageService.subirImagen(archivoImagen, imageFolder);
          imagenSubidaEnEstaOperacion = rutaNueva;
        }
        if (nombreCampoImagen) datos[nombreCampoImagen] = rutaNueva;

        const registro = registroEditando
          ? await service.actualizar(registroEditando.id, datos)
          : await service.crear(datos);

        // La imagen anterior se elimina solo después de confirmar el guardado de la fila.
        if (rutaAnterior && rutaAnterior !== rutaNueva) {
          try {
            await storageService.eliminarImagen(rutaAnterior);
          } catch (cleanupError) {
            console.error('No se pudo eliminar la imagen anterior:', cleanupError);
            toast.warning('El registro se guardó, pero no se pudo borrar la imagen anterior de Storage.');
          }
        }
        return registro;
      } catch (err) {
        // Si falló PostgreSQL, se intenta limpiar el archivo recién subido.
        if (imagenSubidaEnEstaOperacion) {
          try { await storageService.eliminarImagen(imagenSubidaEnEstaOperacion); }
          catch (cleanupError) { console.error('No se pudo limpiar la imagen nueva:', cleanupError); }
        }
        throw err;
      }
    },
    onSuccess: async () => {
      await invalidar();
      toast.success(registroEditando ? 'Registro actualizado correctamente.' : 'Registro creado correctamente.');
      cerrarModal();
    },
    onError: (err) => toast.error(err.message || 'No se pudo guardar el registro.'),
  });

  const eliminarMutation = useMutation({
    mutationFn: async (registro) => {
      await service.eliminar(registro.id);
      const ruta = nombreCampoImagen ? registro[nombreCampoImagen] : null;
      if (ruta) {
        try {
          await storageService.eliminarImagen(ruta);
        } catch (cleanupError) {
          console.error('No se pudo eliminar la imagen del registro:', cleanupError);
          return { imagenPendiente: true };
        }
      }
      return { imagenPendiente: false };
    },
    onSuccess: async (resultado) => {
      await invalidar();
      toast.success(resultado.imagenPendiente
        ? 'Registro eliminado. No se pudo borrar su imagen de Storage.'
        : 'Registro eliminado correctamente.');
    },
    onError: (err) => toast.error(err.message || 'No se pudo eliminar el registro.'),
  });

  const estadoMutation = useMutation({
    mutationFn: ({ id, activo }) => service.cambiarEstado(id, activo),
    onSuccess: async () => { await invalidar(); toast.success('Estado actualizado.'); },
    onError: (err) => toast.error(err.message || 'No se pudo cambiar el estado.'),
  });

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return registros;
    return registros.filter((registro) => fields.some((field) =>
      String(registro[field.name] ?? '').toLowerCase().includes(termino)
    ));
  }, [registros, busqueda, fields]);

  function cerrarModal() {
    setModalAbierto(false);
    setRegistroEditando(null);
    setFormulario({ ...initialValues });
    setArchivoImagen(null);
  }

  function abrirNuevo() {
    setRegistroEditando(null);
    setFormulario({ ...initialValues });
    setArchivoImagen(null);
    setModalAbierto(true);
  }

  function abrirEdicion(registro) {
    setRegistroEditando(registro);
    setArchivoImagen(null);
    setFormulario(Object.fromEntries(fields.map((field) => [
      field.name, registro[field.name] ?? '',
    ])));
    setModalAbierto(true);
  }

  function cambiarCampo(nombre, valor) {
    setFormulario((actual) => {
      const nuevo = { ...actual, [nombre]: valor };
      
      return nuevo;
    });
  }

  function guardar(event) {
    event.preventDefault();
    guardarMutation.mutate();
  }

  function eliminar(registro) {
    Swal.fire({ title: '¿Eliminar este registro?', text: `Se eliminará "${registro.nombre || registro.pregunta}". Esta acción no se puede deshacer.`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', confirmButtonColor: '#b85b76', reverseButtons: true }).then((resultado) => { if (resultado.isConfirmed) eliminarMutation.mutate(registro); });
  }

  return (
    <section>
      <AdminPageHeader
        title={title}
        description={description}
        action={(
          <button onClick={abrirNuevo} className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 font-semibold text-white transition hover:bg-amber-600">
            <FiPlus /> Nuevo registro
          </button>
        )}
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar..." className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-amber-500" />
        </div>
        <p className="text-sm text-neutral-500">{filtrados.length} registros</p>
      </div>

      {isLoading && <PageSkeleton tipo="faq" cantidad={5} />}
      {isError && <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700"><FiAlertCircle className="mb-2" size={24} />No se pudo consultar la información: {error?.message}</div>}

      {!isLoading && !isError && filtrados.length === 0 && (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
          <p className="font-semibold text-neutral-800">{busqueda ? 'No hay coincidencias.' : emptyMessage}</p>
          {!busqueda && <button onClick={abrirNuevo} className="mt-4 font-semibold text-amber-700 hover:underline">Crear el primer registro</button>}
        </div>
      )}

      {!isLoading && !isError && filtrados.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-5 py-4">Contenido</th><th className="px-5 py-4">Estado</th><th className="px-5 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtrados.map((registro) => (
                  <tr key={registro.id} className="hover:bg-stone-50">
                    <td className="max-w-md px-5 py-4">
                      <div className="flex items-center gap-3">
                        {nombreCampoImagen && registro[nombreCampoImagen] ? (
                          <img src={storageService.obtenerUrlPublica(registro[nombreCampoImagen])} alt="" className="h-14 w-14 rounded-lg border border-neutral-200 object-cover" />
                        ) : (
                          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-stone-100 text-stone-400"><FiImage size={22} /></span>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900">{registro.nombre || registro.pregunta}</p>
                          <p className="mt-1 truncate text-xs text-neutral-500">{registro.descripcion || registro.respuesta || registro.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${registro.activo ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-600'}`}>{registro.activo ? 'Activo' : 'Inactivo'}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button title={registro.activo ? 'Publicado — ocultar del sitio' : 'No publicado — mostrar en el sitio'} onClick={() => estadoMutation.mutate({ id: registro.id, activo: !registro.activo })} disabled={estadoMutation.isPending} className="rounded-lg border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-100">{registro.activo ? <FiEye /> : <FiEyeOff />}</button>
                        <button title="Editar" onClick={() => abrirEdicion(registro)} className="rounded-lg border border-neutral-200 p-2 text-blue-700 hover:bg-blue-50"><FiEdit2 /></button>
                        <button title="Eliminar" onClick={() => eliminar(registro)} disabled={eliminarMutation.isPending} className="rounded-lg border border-neutral-200 p-2 text-red-600 hover:bg-red-50"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalAbierto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 p-5">
              <h2 className="text-xl font-bold text-neutral-950">{registroEditando ? 'Editar registro' : 'Nuevo registro'}</h2>
              <button onClick={cerrarModal} className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"><FiX size={22} /></button>
            </div>

            <form onSubmit={guardar} className="space-y-5 p-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.filter((field) => !field.hidden && !field.auto).map((field) => (
                  <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}>
                    {field.type === 'checkbox' ? (
                      <label className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4">
                        <input type="checkbox" checked={Boolean(formulario[field.name])} onChange={(event) => cambiarCampo(field.name, event.target.checked)} className="h-4 w-4 accent-amber-600" />
                        <span className="text-sm font-medium text-neutral-700">{field.label}</span>
                      </label>
                    ) : field.type === 'image' ? (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-neutral-700">{field.label}</label>
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-stone-50 px-5 py-6 text-center transition hover:border-amber-500 hover:bg-amber-50">
                          <FiUploadCloud className="mb-2 text-amber-700" size={28} />
                          <span className="text-sm font-semibold text-neutral-800">Elegir imagen</span>
                          <span className="mt-1 text-xs text-neutral-500">JPG, PNG, WebP o AVIF · máximo 5 MB</span>
                          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => setArchivoImagen(event.target.files?.[0] || null)} />
                        </label>
                        {(urlTemporal || rutaImagenActual) && (
                          <div className="mt-3 flex items-center gap-3 rounded-xl border border-neutral-200 p-3">
                            <img src={urlTemporal || storageService.obtenerUrlPublica(rutaImagenActual)} alt="Vista previa" className="h-20 w-20 rounded-lg object-cover" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-neutral-800">{archivoImagen?.name || 'Imagen actual'}</p>
                              <p className="text-xs text-neutral-500">{archivoImagen ? `${(archivoImagen.size / 1024 / 1024).toFixed(2)} MB` : 'Se conserva hasta guardar los cambios.'}</p>
                            </div>
                            <button type="button" onClick={() => { setArchivoImagen(null); cambiarCampo(field.name, ''); }} className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Quitar</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <label className="mb-2 block text-sm font-semibold text-neutral-700">{field.label}{field.required && ' *'}</label>
                        {field.type === 'textarea' ? (
                          <textarea value={formulario[field.name] ?? ''} onChange={(event) => cambiarCampo(field.name, event.target.value)} required={field.required} maxLength={field.maxLength} rows={field.rows || 4} placeholder={field.placeholder || ''} className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500" />
                        ) : (
                          <input type={field.type || 'text'} value={formulario[field.name] ?? ''} onChange={(event) => cambiarCampo(field.name, event.target.value)} required={field.required} min={field.min} max={field.max} maxLength={field.maxLength} step={field.step} placeholder={field.placeholder || ''} readOnly={field.readOnly} className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-amber-500 read-only:bg-neutral-100" />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
                <button type="button" onClick={cerrarModal} className="rounded-xl border border-neutral-200 px-5 py-3 font-semibold text-neutral-700">Cancelar</button>
                <button type="submit" disabled={guardarMutation.isPending} className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-bold text-neutral-950 disabled:opacity-50">
                  <FiSave />{guardarMutation.isPending ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
