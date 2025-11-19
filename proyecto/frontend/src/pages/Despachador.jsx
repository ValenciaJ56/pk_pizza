import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const irAProductos = () => {
    navegar("/productos");
  };

  const handleAdd = () => {
    const prod = productos.find((p) => String(p.id) === String(selectedId));
    if (!prod) return;

    const nuevo = {
      id: Date.now(),
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

  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Despachador</h2>
            <button
              onClick={irAProductos}
              className="bg-[#c41e3a] hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
            >
              Ver Productos
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-300">Número de orden</label>
                <input value={orderNumber} onChange={e => setOrderNumber(e.target.value)} placeholder="auto" className="bg-gray-700 text-white px-3 py-1 rounded w-32" />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => {
                  // create new order
                  const number = orderNumber ? orderNumber : ((orders.length > 0) ? String(Math.max(...orders.map(o => Number(o.number || 0))) + 1) : '1')
                  const newOrder = { id: Date.now(), number, items: [] }
                  setOrders(prev => [...prev, newOrder])
                  setActiveOrderId(newOrder.id)
                  setOrderNumber('')
                }} className="bg-[#c41e3a] hover:bg-red-700 text-white font-semibold px-4 py-2 rounded">
                  Agregar orden
                </button>
                <button onClick={() => { setActiveOrderId(null); setPedido([]) }} className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded">Cancelar orden activa</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xl font-medium text-gray-200">
                  Producto
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="mt-2 w-full bg-gray-700 text-white rounded px-3 py-2"
                >
                  <option value="">-- Seleccione un producto --</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} {p.precio ? `- $${p.precio}` : ""}
                    </option>
                  ))}
                </select>

                <div className="mt-4">
                  <label className="block text-xl font-medium text-gray-200">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    className="mt-2 w-40 bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-xl font-medium text-gray-200">
                    Tamaño
                  </label>


                <div className="flex flex-wrap gap-3 mt-2">
                  {[
                    { id: "pequeño", label: "Personal" },
                    { id: "mediano", label: "Mediano" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTamano(t.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition 
                      ${
                        tamano === t.id
                          ? "bg-red-600 text-white shadow-lg scale-105"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }
                    `}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

              <div>
                <label className="block text-xl font-medium text-gray-200">
                  Observaciones
                </label>
                <textarea
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  rows={6}
                  className="mt-2 w-full bg-gray-700 text-white rounded-3xl px-7 py-7"
                />

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={handleAdd}
                    className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-2xl"
                  >
                    +
                  </button>
                  <span className="text-xl text-gray-300">
                    Agregar al orden activa
                  </span>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Órdenes</h3>

            {orders.length === 0 ? (
              <p className="text-gray-300">No hay órdenes creadas.</p>
            ) : (
              <div className="space-y-4">
                {[...orders].slice().reverse().map(o => (
                  <div key={o.id} className={`bg-gray-800 rounded-lg p-4 ${activeOrderId === o.id ? 'ring-2 ring-red-600' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold">Orden #{o.number}</div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setActiveOrderId(o.id)} className="text-sm px-3 py-1 bg-gray-700 rounded">Abrir</button>
                        <button onClick={() => setOrders(prev => prev.filter(x => x.id !== o.id))} className="text-sm px-3 py-1 bg-red-600 rounded">Eliminar orden</button>
                      </div>
                    </div>

                    {o.items && o.items.length > 0 ? (
                      <ul className="divide-y divide-gray-700">
                        {o.items.map(item => (
                          <li key={item.id} className="py-3 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-white">{item.nombre} <span className="text-sm text-gray-300">x{item.cantidad}</span></div>
                              <div className="text-sm text-gray-400">Tamaño: {item.tamano} — {item.observaciones}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-white font-medium">${(item.precioUnitario * item.cantidad).toFixed(2)}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-300">No hay productos en esta orden.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default Despachador;
