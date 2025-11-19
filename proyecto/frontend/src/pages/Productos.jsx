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

      <div>
        <h1 className="text-5xl" style={{color: "white"}}>Chef Page</h1>

        <h2 className="text-2xl mt-5" style={{color: "white"}}>Lista de Productos:</h2>

        <ul className="mt-3">
          {Array.isArray(productos) ? (productos.map(prod => (
            <li key={prod.id} className="p-2 border-b" style={{color: "white"}}>
              {prod.nombre} — ${prod.precio}
            </li>
          ))) : (<p style={{color: "white"}}>No se pudo cargar</p>)}
        </ul>
      </div>
    </>
  );
}

export default Productos;
