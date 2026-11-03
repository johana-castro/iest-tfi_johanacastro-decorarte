import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { agregarProducto, actualizarCantidad, calcularCantidad, calcularTotal } from '../utils/carrito';

const CarritoContext = createContext(null);
const STORAGE_KEY = 'decorarte-carrito-v1';

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(guardado) ? guardado : []; }
    catch { return []; }
  });
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);

  const agregar = (producto) => {
    setItems((actuales) => agregarProducto(actuales, producto));
    toast.success(`${producto.nombre} agregado al pedido.`);
  };
  const cambiarCantidad = (id, cantidad) => setItems((actuales) => actualizarCantidad(actuales, id, cantidad));
  const quitar = (id) => setItems((actuales) => actuales.filter((item) => item.id !== id));
  const vaciar = () => setItems([]);
  const cantidadTotal = calcularCantidad(items);
  const total = calcularTotal(items);
  const valor = useMemo(() => ({ items, agregar, cambiarCantidad, quitar, vaciar, cantidadTotal, total }), [items, cantidadTotal, total]);
  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}
export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) throw new Error('useCarrito debe utilizarse dentro de CarritoProvider');
  return contexto;
}
