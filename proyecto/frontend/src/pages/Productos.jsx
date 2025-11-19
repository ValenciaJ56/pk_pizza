import Navbar from "../components/Navbar";
import Header from "../components/Header";

import { useState, useEffect } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos", 
      { method: "GET" 
      })
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Lista de Productos</h1>

            <a href="/productos" className="inline-block bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md transition">
              Agregar Producto
            </a>
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
                    <a href={`/productos/${producto.id}`} className="text-sm border border-gray-300 text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition">Eliminar</a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center text-lg">No se pudo cargar la lista de productos.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Productos;
