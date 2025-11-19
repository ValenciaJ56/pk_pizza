import Navbar from "../components/Navbar";
import Header from "../components/Header";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Productos() {
  const navegar = useNavigate();
  
  const irADespachador = () => {
    navegar("/despachador");
  }

  function eliminarProducto(id) {
    fetch(`http://localhost:8080/api/productos/${id}`, 
      {method: "DELETE" 
      })
      .then(() => {
        setProductos(prev => prev.filter(p => p.id !== id));
      })
      .catch(error => console.error("Error al eliminar el producto", error));
  };
  
  
  const [productos, setProductos] = useState([]);

  // Nuevo estado para modal y formulario
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");

  const cargarProductos = () => {
    fetch("http://localhost:8080/api/productos", 
      { method: "GET" 
      })
      .then(res => res.json())
      .then(data => setProductos(Array.isArray(data) ? data : []))
      .catch(error => console.error("Error al obtener productos:", error));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const abrirModal = () => {
    setNuevoNombre("");
    setNuevoPrecio("");
    setNuevaDescripcion("");
    setModalOpen(true);
  }

  const cerrarModal = () => {
    setModalOpen(false);
  }

  const agregarProducto = async () => {
    // validaciones simples
    if (!nuevoNombre.trim() || nuevoPrecio === "" || isNaN(Number(nuevoPrecio))) {
      alert("Ingrese nombre y precio válidos.");
      return;
    }

    const nuevo = {
      nombre: nuevoNombre.trim(),
      precio: Number(nuevoPrecio),
      descripcion: nuevaDescripcion.trim()
    };

    try {
      await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
      });
      // recargar lista desde backend (asegura que se refleje en products.csv)
      cargarProductos();
      cerrarModal();
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error al crear producto");
    }
  }

  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Lista de Productos</h1>

            <div className="contenedor-cajas flex gap-4">
              {/* Abrir modal en vez de navegar */}
              <button onClick={abrirModal} className="inline-block bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md transition">
                Agregar Producto
              </button>

              <button onClick={irADespachador} className="inline-block bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md transition">
                Atrás
              </button>
            </div>
          </div>

          {Array.isArray(productos) && productos.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productos.map((producto) => (
                <li key={producto.id} className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{producto.nombre}</h2>
                    <p className="text-sm text-gray-600 mt-1">{producto.descripcion ? producto.descripcion : 'Deliciosa opción'}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-block bg-[#c41e3a] text-white font-semibold px-4 py-2 rounded-full">${producto.precio}</span>
                    <button onClick={() => eliminarProducto(producto.id)} className="text-sm border border-gray-300 text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center text-lg">No se pudo cargar la lista de productos.</p>
          )}
        </div>
      </main>

      {/* Modal para crear producto */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={cerrarModal}></div>
          <div className="relative bg-white rounded-lg w-full max-w-lg p-6 z-10 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Agregar Producto</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold">Nombre</label>
                <input value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} className="mt-2 w-full bg-gray-100 text-gray-900 rounded px-3 py-2 border" />
              </div>

              <div>
                <label className="block text-sm font-semibold">Precio</label>
                <input value={nuevoPrecio} onChange={e => setNuevoPrecio(e.target.value)} className="mt-2 w-full bg-gray-100 text-gray-900 rounded px-3 py-2 border" />
              </div>

              <div>
                <label className="block text-sm font-semibold">Descripción (opcional)</label>
                <input value={nuevaDescripcion} onChange={e => setNuevaDescripcion(e.target.value)} className="mt-2 w-full bg-gray-100 text-gray-900 rounded px-3 py-2 border" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={cerrarModal} className="px-4 py-2 bg-gray-100 rounded border">Cancelar</button>
              <button onClick={agregarProducto} className="px-4 py-2 bg-[#c41e3a] text-white rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Productos;