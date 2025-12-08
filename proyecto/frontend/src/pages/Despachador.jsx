import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderTimer from "../components/OrderTimer";
function Despachador() {
  const navegar = useNavigate();
  const [productos, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [tamano, setTamano] = useState("mediano");
  const [obs, setObs] = useState("");
  const [pedido, setPedido] = useState([]);
  const [orders, setOrders] = useState([])
  const [activeOrderId, setActiveOrderId] = useState(null)
  const [orderNumber, setOrderNumber] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOrder, setModalOrder] = useState(null)
  const [pedidos, setPedidos] = useState([])

  // modal state handled below (modalOpen/modalOrder)


  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos", 
      { method: "GET" 
      })
      .then(res => res.json())
      .then(data => setPedidos(Array.isArray(data) ? data : []))
      .catch(error => console.error("Error al obtener pedidos:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const irAProductos = () => {
    navegar("/productos");
  };

  const irAPedidos = () => {
    navegar("/pedidos");
  };

  const irACierreCaja = () => {
    navegar("/cierre");
  };

  const handleAdd = () => {
    const prod = productos.find((p) => String(p.id) === String(selectedId));
    if (!prod) return;

    const nuevo = {
      id: pedidos.length + 1,
      productoId: prod.id,
      nombre: prod.nombre,
      cantidad: Number(cantidad) || 1,
      tamano,
      observaciones: obs,
      precioUnitario: prod.precio ?? 0,
    };

    // If there's an active order, add item to that order; otherwise add to temporary pedido
    if (activeOrderId) {
      setOrders(prev => prev.map(o => {
        if (o.id === activeOrderId) {
          return { ...o, items: [...o.items, nuevo] }
        }
        return o
      }))
    } else {
      setPedido((prev) => [...prev, nuevo]);
    }

    // reset form
    setSelectedId("");
    setCantidad(1);
    setTamano("mediano");
    setObs("");
  };

  const handleRemove = (id) => {
    setPedido((prev) => prev.filter((item) => item.id !== id));
  };

  const openModify = (pedido) => {
    const copy = JSON.parse(JSON.stringify(pedido))
    setModalOrder(copy)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalOrder(null)
  }

  const saveModal = () => {
    if (!modalOrder) return
    const idNum = Number(modalOrder.id)
    setOrders(prev => prev.map(o => Number(o.id) === idNum ? modalOrder : o))
    setPedidos(prev => prev.map(p => Number(p.id) === idNum ? modalOrder : p))
    setModalOpen(false)
    setModalOrder(null)
  }

  function modificarPedido(pedido){
    fetch(`http://localhost:8080/api/pedidos/${pedido.id}`, { 
      method: "PUT",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        estado: pedido.estado,
        items: pedido.items
      })
    })
      .then(() => {
        setPedidos(prev =>
          prev.map(p => (p.id === pedido.id ? {...p, items: pedido.items}: p))
        )})
      .catch(error => console.error("Error al obtener pedidos:", error));
    setModalOpen(false)
    setModalOrder(null)
  }

  const updateModalOrderField = (field, value) => {
    setModalOrder(prev => ({ ...prev, [field]: value }))
  }

  const updateModalItemField = (itemId, field, value) => {
    const idNum = Number(itemId)
    setModalOrder(prev => ({
      ...prev,
      items: (prev.items || []).map(it => {
        const itId = it.id ?? (it.producto && it.producto.id)
        if (Number(itId) === idNum) {
          const updated = { ...it, [field]: value }
          if (field === 'observaciones') updated.observacion = value
          if (field === 'observacion') updated.observaciones = value
          return updated
        }
        return it
      })
    }))
  }
  const confirmarOrden = async (order, pedidos) => {
    // Validar que la orden tenga items
    if (!order.items || order.items.length === 0) {
      alert("No puedes confirmar una orden sin productos");
      return;
    }
    // Serializar items al formato esperado: {"producto":{"id":...,"nombre":...,"precio":...},"cantidad":...,"observacion":...}
    const itemsFormato = order.items.map(item => ({
      producto: {
        id: item.productoId,
        nombre: item.nombre,
        precio: item.precioUnitario
      },
      estado: item.estado,
      cantidad: item.cantidad,
      observacion: item.observaciones || ""
    }));

    const pedidoGuardar = {
      numero: order.id,//puede que sea order.id
      items: itemsFormato,
      estado: "espera" // estado inicial
    };
    try {
      await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoGuardar)
      });
      localStorage.setItem(`order_${order.id}_startedAt`, Date.now().toString());
      // Marcar localmente como confirmada después de guardar en backend
      
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, confirmed: true, confirmedAt: Date.now(), startedAt: Date.now() } : o));
      if (activeOrderId === order.id) setActiveOrderId(null);

    } catch (err) {
      console.error("Error al confirmar orden en backend:", err);
      alert("Error al confirmar la orden");
    }

    {pedidosGuardados(pedidos)}
  }

  

  const removeModalItem = (itemId) => {
    const idNum = Number(itemId)
    setModalOrder(prev => ({ ...prev, items: (prev.items || []).filter(it => Number(it.id ?? (it.producto && it.producto.id)) !== idNum) }))
  }

  function eliminarPedido(id){
    fetch(`http://localhost:8080/api/pedidos/${id}`, {
        method: "DELETE"
      })
      .then(() => {
        setPedidos(prev => prev.filter(p => p.id !== id));
      })
      .catch(error => console.error("Error al eliminar el producto", error));
  };

  function pedidosGuardados(pedidos){
    const pedidosFiltrados = pedidos.filter(pedido => pedido.estado !== "listo");

    return (
      <>
        {pedidosFiltrados.map(pedido => (
          <div key={pedido.id} className={`bg-white rounded-lg p-4 ${activeOrderId === pedido.id ? 'ring-2 ring-red-600' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold text-black">Orden #{pedido.id} ({pedido.estado == "espera" ? 'En espera' : 'En preparación'})</div>
              <div className="flex items-center gap-2">
                {/*<button onClick={() => setActiveOrderId(o.id)} className="text-sm font-bold px-6 py-1.5 bg-[#edefd6] rounded border">Factura</button>*/}
                <button onClick={() => eliminarPedido(pedido.id)} className="text-sm font-bold px-6 py-1.5 bg-red-600 text-white rounded">Eliminar orden</button>
                {/* <button onClick={() => setOrders(prev => prev.filter(x => x.id !== o.id))} className="text-sm font-bold px-3 py-1 bg-[#F5A81D] text-white rounded">Modificar orden</button> */}
                <button onClick={() => openModify(pedido)} className="text-sm font-bold px-6 py-1.5 bg-[#F5A81D] text-white rounded">
                  Modificar orden
                </button>

                <button onClick={() => confirmarOrden(pedido)} disabled={pedido.confirmed} className={`text-sm font-bold px-6 py-1.5 rounded bg-gray-300 text-gray-700 cursor-default`}>
                  Orden confirmada
                </button>
              </div>
              {/* Temporizador dentro del recuadro de la orden, debajo de los botones */}
              <OrderTimer startedAt={pedido.startedAt} orderId={pedido.id} />
            </div>

            {pedido.items && pedido.items.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {pedido.items.map(item => (
                <li key={item.producto.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{item.producto.nombre} <span className="text-sm text-gray-600">x {item.cantidad}</span></div>
                      {/*<div className="text-sm text-gray-600">Tamaño: {item.tamano} — {item.observaciones}</div>*/}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-gray-900 font-medium">$ {(item.producto.precio * item.cantidad).toFixed(2)}</div>
                    </div>
                </li>
              ))}
            </ul>
            ) : (
              <p className="text-gray-600">No hay productos en esta orden.</p>
            )}
          </div>
        ))}
    </>)
  }

  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-100 text-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Despachador</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={irACierreCaja}
                className="bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md">
                Cierre de Caja
              </button>
              <button
                onClick={irAProductos}
                className="bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md">
                Ver Productos
              </button>
              <button
                onClick={irAPedidos}
                className="bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md">
                Ver Pedidos
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                  <label className="text-sm text-black font-bold">Número de orden</label>
                  <input value={orderNumber} onChange={e => setOrderNumber(e.target.value)} placeholder="auto" className="bg-gray-200 text-gray-900 px-3 py-1 rounded border w-32 focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition" />
                </div>
              <div className="flex items-center gap-3">
                <button onClick={() => {

                  const number = orderNumber ? orderNumber : ((orders.length > 0) ? String(Math.max(...orders.map(o => Number(o.number || 0))) + 1) : '1')
                  const newOrder = { id: pedidos.length + 1, number, items: [] }
                  setOrders(prev => [...prev, newOrder])
                  setActiveOrderId(newOrder.id)
                  setOrderNumber('')
                }} className="bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md transition transform hover:shadow-lg active:scale-95">
                  Agregar orden
                </button>
                
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xl font-bold text-black">
                  Producto
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="mt-2 w-full bg-gray-200 text-gray-900 rounded px-3 py-2 border focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition"
                >
                  <option value="">-- Seleccione un producto --</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} {p.precio ? `- $${p.precio}` : ""}
                    </option>
                  ))}
                </select>

                <div className="mt-4">
                  <label className="block text-xl font-bold text-black">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    className="mt-2 w-40 bg-gray-200 text-gray-900 rounded px-3 py-2 border focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition"
                  />
                </div>

                <div className="mt-4">
                  {/*<label className="block text-xl font-bold text-black">
                      Tamaño
                    </label>*/}


                {/*div className="flex flex-wrap gap-3 mt-2">
                  {[
                    { id: "pequeño", label: "Personal" },
                    { id: "mediano", label: "Mediano" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTamano(t.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition transform 
                      ${
                        tamano === t.id
                          ? "bg-[#c41e3a] text-white shadow-md scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } active:scale-95
                    `}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>*/}
              </div>
            </div>

              <div>
                <label className="block text-xl font-bold text-black">Observaciones</label>
                <textarea
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  rows={6}
                  className="mt-2 w-full bg-gray-200 text-gray-900 rounded px-4 py-3 border focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition"
                />

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={handleAdd}
                    className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white text-2xl transition transform hover:shadow-lg active:scale-95"
                  >
                    +
                  </button>
                  <span className="text-xl text-black font-bold">Agregar a la orden activa</span>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-6">
            <h3 className="text-xl text-black font-bold mb-3">Órdenes Pendientes</h3>

            {orders.length === 0 && pedidos.length === 0 ? (
              <p className="text-black font-bold ">No hay órdenes creadas</p>
            ) : (
              <div className="space-y-4">
                {[...orders].slice().reverse().map(o => (
                  <div key={o.id} className={`bg-white rounded-lg p-4 ${activeOrderId === o.id ? 'ring-2 ring-red-600' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-bold text-black">Orden Nueva</div>
                      <div className="flex items-center gap-2">
                        <button
                            onClick={() => { 
                              confirmarOrden(o, pedidos)
                              pedidosGuardados(pedidos)}}
                            disabled={o.confirmed}
                            
                            className={`text-sm font-bold px-6 py-1.5 rounded ${o.confirmed ? 'bg-gray-300 text-gray-700 cursor-default' : 'bg-green-600 text-white'}`}
                          >
                            {o.confirmed ? 'Orden confirmada' : 'Confirmar orden'}
                            
                          </button>
                      </div>
                      {/* Temporizador dentro del recuadro de la orden, debajo de los botones */}
                    </div>

                    {o.items && o.items.length > 0 ? (
                      <ul className="divide-y divide-gray-100">
                        {o.items.map(item => (
                          <li key={item.id} className="py-3 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">{item.nombre} <span className="text-sm text-gray-600">x{item.cantidad}</span></div>
                              <div className="text-sm text-gray-600">Tamaño: {item.tamano} — {item.observaciones}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-gray-900 font-medium">${(item.precioUnitario * item.cantidad).toFixed(2)}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No hay productos en esta orden.</p>
                    )}
                  </div>
                ))}  
                {pedidosGuardados(pedidos)}
              </div>
            )}
          </section>

          {modalOpen && modalOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={closeModal}></div>
              <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 z-10 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Editar Orden #{modalOrder.id}</h3>

                <div className="space-y-3 max-h-64 overflow-auto mb-4">
                  {modalOrder.items && modalOrder.items.length > 0 ? modalOrder.items.map(item => (
                    <div key={item.producto.id} className="flex items-start justify-between gap-4 p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.producto.nombre}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-sm">Cant</label>
                          <input type="number" min="1" value={item.cantidad} onChange={e => updateModalItemField(item.producto?.id ?? item.id, 'cantidad', Number(e.target.value))} className="w-20 bg-white border rounded px-2 py-1" />
                          {/*<label className="text-sm">Tamaño</label>
                          <select value={item.tamano} onChange={e => updateModalItemField(item.id, 'tamano', e.target.value)} className="bg-white border rounded px-2 py-1">
                            <option value="pequeño">Personal</option>
                            <option value="mediano">Mediano</option>
                            <option value="grande">Grande</option>
                          </select>*/} {/*comenté esto, porque si. nah mentiras para el prox. sprint */}
                        </div>
                        <div className="mt-2">
                          <label className="text-sm">Observaciones</label>
                          <input value={item.observacion || item.observaciones || ''} onChange={e => updateModalItemField(item.producto?.id ?? item.id, 'observaciones', e.target.value)} className="mt-1 w-full bg-white border rounded px-2 py-1" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <div className="text-gray-900 font-medium">${(item.producto.precio * item.cantidad).toFixed(2)}</div>
                        <button onClick={() => removeModalItem(item.producto.id)} className="text-sm px-3 py-1 bg-red-600 text-white rounded">Eliminar</button>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-600">No hay productos en la orden.</p>
                  )}
                  
                </div>

                <div className="flex justify-end gap-3">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-100 rounded border">Cancelar</button>
                  <button onClick={() => modificarPedido(modalOrder)} className="px-4 py-2 bg-[#c41e3a] text-white rounded">Guardar cambios</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}






export default Despachador;
