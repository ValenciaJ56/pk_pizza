import Navbar from "../components/Navbar";
import Header from "../components/Header";
import menuImage from "../assets/MenuWide.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CierreCaja() {
  const [pedidos, setPedidos] = useState([]);

  function productosVendidos(pedidos){
    let productosVendidos = {}
    pedidos.forEach(pedido => {
        pedido.items.forEach(item => {
          if (pedido.estado == "listo"){
            if (item.producto.id in productosVendidos){
                productosVendidos[item.producto.id][2] += item.cantidad
            }else{
                productosVendidos[item.producto.id] = [item.producto.nombre, item.producto.precio, item.cantidad]
            }
          }
        })
    });
    return productosVendidos
  }

  function calcularTotal(productosVendidos){
    let total = 0
    Object.entries(productosVendidos).forEach(([id, producto]) => {
        total += (producto[1] * producto[2])
    })
    return total
  }

  function cerrarCaja(){
    console.log("aqui")
    {/*fetch(`http://localhost:8080/api/pedidos/${pedido.id}`, { 
      method: "POST",
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
      .catch(error => console.error("Error al obtener pedidos:", error));*/}
  }
  
  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos", 
      { method: "GET" 
      })
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(error => console.error("Error al obtener pedidos:", error));
    }, []);


  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Cierre de caja</h1>
            <button
              onClick={()=> cerrarCaja()}
              className="bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md">
              Cerrar Caja
            </button>
          </div>

          {Array.isArray(pedidos) && pedidos.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Producto</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Precio Unitario</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Cantidad Vendida</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                  {Object.entries(productosVendidos(pedidos)).map(([id, producto]) => {
                    return (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{producto[0]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">$ {producto[1]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right"> {producto[2]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">$ {producto[1] * producto[2]}</td>
                      </tr>
                    )
                  })}
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">$ {calcularTotal(productosVendidos(pedidos))}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg">No se pudo cargar la lista de pedidos.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default CierreCaja;