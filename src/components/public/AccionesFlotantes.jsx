import { useEffect, useState } from 'react';
import { FiArrowUp, FiMinus, FiPlus, FiShoppingBag, FiTrash2, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCarrito } from '../../contexts/CarritoContext';
import { crearEnlaceWhatsApp } from '../../utils/whatsapp';
import { crearMensajePedido } from '../../utils/carrito';

const moneda = (valor, codigo = 'ARS') => new Intl.NumberFormat('es-AR', { style: 'currency', currency: codigo, maximumFractionDigits: 2 }).format(valor);
export default function AccionesFlotantes() {
  const { items, cantidadTotal, total, cambiarCantidad, quitar, vaciar } = useCarrito();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarArriba, setMostrarArriba] = useState(false);
  useEffect(() => {
    const revisar = () => setMostrarArriba(window.scrollY > 420);
    revisar(); window.addEventListener('scroll', revisar, { passive: true });
    return () => window.removeEventListener('scroll', revisar);
  }, []);
  const mensaje = crearMensajePedido(items);
  const enlacePedido = crearEnlaceWhatsApp(mensaje);
  const enlaceConsulta = crearEnlaceWhatsApp('Hola DecorArte, quisiera realizar una consulta.');
  const enviar = () => {
    if (!items.length) return toast.info('Agregá al menos un producto para preparar tu pedido.');
    if (!enlacePedido) return toast.error('El WhatsApp de DecorArte todavía no está configurado.');
    window.open(enlacePedido, '_blank', 'noopener,noreferrer');
    toast.info('Revisá el mensaje de WhatsApp y envialo. El pedido se confirma cuando DecorArte verifique el stock.');
  };
  return <>
    {mostrarCarrito && <div className="cart-backdrop" onClick={() => setMostrarCarrito(false)} />}
    {mostrarCarrito && <aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Carrito de pedidos">
      <div className="cart-panel-head"><div><span className="eyebrow">Tu selección</span><h2>Mi pedido <small>({cantidadTotal})</small></h2></div><button className="icon-button" onClick={() => setMostrarCarrito(false)} aria-label="Cerrar carrito"><FiX /></button></div>
      {!items.length ? <div className="cart-empty"><FiShoppingBag size={30}/><p>Tu carrito está vacío.</p><span>Sumá productos del catálogo para preparar tu pedido.</span></div> : <>
        <div className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}><div className="cart-item-info"><strong>{item.nombre}</strong><small>{item.precio > 0 ? moneda(item.precio, item.moneda) : 'Precio a consultar'}</small><div className="quantity-control"><button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} aria-label="Restar"><FiMinus/></button><span>{item.cantidad}</span><button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} aria-label="Sumar"><FiPlus/></button></div></div><button className="remove-item" onClick={() => quitar(item.id)} aria-label={`Quitar ${item.nombre}`}><FiTrash2/></button></article>)}</div>
        <div className="cart-summary"><div><span>Total estimado</span><strong>{items.some((item) => !(item.precio > 0)) || new Set(items.map((item) => item.moneda || 'ARS')).size > 1 ? 'A confirmar' : moneda(total, items[0]?.moneda || 'ARS')}</strong></div><small>Los precios y el stock se verifican antes de confirmar el pedido.</small><button className="btn-primary" onClick={enviar}><FaWhatsapp/> Enviar pedido por WhatsApp</button><button className="cart-clear" onClick={vaciar}>Vaciar carrito</button></div>
      </>}
    </aside>}
    {mostrarArriba && <button className="floating-action back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Volver arriba" title="Volver arriba"><FiArrowUp/></button>}
    <button className="floating-action cart-trigger" onClick={() => setMostrarCarrito((v) => !v)} aria-label={`Abrir carrito, ${cantidadTotal} productos`} title="Mi pedido"><FiShoppingBag/>{cantidadTotal > 0 && <span className="cart-count">{cantidadTotal}</span>}</button>
    {enlaceConsulta ? <a className="floating-action whatsapp-trigger" href={enlaceConsulta} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp" title="WhatsApp"><FaWhatsapp/></a> : <button className="floating-action whatsapp-trigger" onClick={() => toast.error('El WhatsApp de DecorArte todavía no está configurado.')} aria-label="WhatsApp no configurado" title="WhatsApp"><FaWhatsapp/></button>}
  </>;
}
