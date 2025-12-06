import Navbar from "../components/Navbar";
import Header from "../components/Header";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {jsPDF} from "jspdf";
import { Variable } from "lucide-react";

function Pedidos() {
  const navegar = useNavigate();

  const crearFactura = (pedido) => {
    const doc = new jsPDF();
    let variable = 60;
    doc.text("Factura PK Pizza", 80, 15)
    doc.line(0, 20, 500, 20)
    doc.text("Producto", 10, 40)
    doc.text("Cantidad", 80, 40)
    doc.text("Precio Unitario", 120, 40)
    doc.text("Total", 160, 40)

    pedido.items.forEach(item => {
        doc.text(`${item.producto.nombre}`, 10, variable)
        doc.text(`${item.cantidad}`, 80, variable)
        doc.text(`${item.producto.precio}`, 120, variable)
        doc.text(`${item.producto.precio * item.cantidad}`, 160, variable)
        variable += 20
    })
    doc.save(`pedido ${pedido.id}.pdf`)
  }

  const irADespachador = () => {
    navegar("/despachador");
  }
  
  const [pedidos, setPedidos] = useState([]);

  const cargarPedidos = () => {
    fetch("http://localhost:8080/api/pedidos", 
      { method: "GET" 
      })
      .then(res => res.json())
      .then(data => setPedidos(Array.isArray(data) ? data : []))
      .catch(error => console.error("Error al obtener pedidos:", error));
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  function calcularTotal(pedido) {
    let total = 0
    pedido.items.forEach(item => 
        total += Number(item.producto.precio * item.cantidad))
    return total
  }

  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Lista de Pedidos Listos</h1>

            <div className="contenedor-cajas flex gap-4">
              <button onClick={irADespachador} className="inline-block bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md transition">
                Atrás
              </button>
            </div>
          </div>

          {Array.isArray(pedidos) && pedidos.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pedidos.map((pedido) => (
                <div key={pedido.id} className="bg-white rounded-lg p-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">Orden #{pedido.id}</h2>
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

                  <div className="flex items-center gap-4">
                    <button onClick={() => crearFactura(pedido)} className="text-sm border border-gray-300 text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition">Crear Factura</button>
                    <span className="inline-block bg-[#c41e3a] text-white font-semibold px-4 py-2 rounded-full">$ {calcularTotal(pedido)}</span>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center text-lg">No se pudo cargar la lista de pedidos</p>
          )}
        </div>
      </main>    
    </>
  );
}

export default Pedidos;