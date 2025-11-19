import Navbar from "../components/Navbar";
import Header from "../components/Header";

import { useState, useEffect } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-extrabold text-white">Lista de Productos</h1>

            <a href="/productos" className="inline-block bg-[#c41e3a] hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow">
              Agregar Producto
            </a>
          </div>

          {Array.isArray(productos) && productos.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productos.map((prod) => (
                <li key={prod.id} className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-lg transform hover:-translate-y-1 transition">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{prod.nombre}</h2>
                    <p className="text-sm text-gray-300 mt-1">{prod.descripcion ? prod.descripcion : 'Deliciosa opción'}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-block bg-[#c41e3a] text-white font-semibold px-3 py-1 rounded-full">${prod.precio}</span>
                    <a href={`/productos/${prod.id}`} className="text-sm border border-white text-white px-3 py-1 rounded hover:bg-white hover:text-gray-900 transition">Eliminar</a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No se pudo cargar la lista de productos.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Productos;
