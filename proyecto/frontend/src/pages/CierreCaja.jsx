import Navbar from "../components/Navbar";
import Header from "../components/Header";
import menuImage from "../assets/MenuWide.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import {saveAs} from "file-saver";

function CierreCaja() {
  const navegar = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [ventanaEmergente, setVentana] = useState(false);
  const [ventaActual, setVentaActual] = useState(null);

  const irADespachador = () => {
    navegar("/despachador");
  };

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

  async function cerrarCaja(productosVendidos){
    let productosJson = [];
    Object.entries(productosVendidos).forEach(([idp, p]) => {
      productosJson.push({
        id: idp,
        nombre: p[0],
        precio: p[1],
        cantidad: p[2]
      })
    })

    if (Object.keys(productosVendidos).length != pedidos.length){
      alert("No se puede cerrar caja, porque hay pedidos sin finalizar")
    }else{
    if (Object.keys(productosVendidos).length > 0){
      const documento = new ExcelJS.Workbook();
      const hoja = documento.addWorksheet("Ventas");

      hoja.addRow(["Producto", "Precio Unitario", "Cantidad", "Precio Total"]);

      Object.entries(productosVendidos).forEach(([id, productoVendido]) => {
        hoja.addRow([productoVendido[0], productoVendido[1], productoVendido[2], productoVendido[1] * productoVendido[2]]);
      })

      hoja.addRow(["Total", "", "", calcularTotal(productosVendidos)]);

      const convertidor = await documento.xlsx.writeBuffer();
      const fecha = new Date().toLocaleDateString().replace(/\//g, "-");
      saveAs(new Blob([convertidor]), `Ventas ${fecha}.xlsx`);

      fetch("http://localhost:8080/api/ventas_diarias", 
      { 
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        "productosVendidos": productosJson,
        "total": calcularTotal(productosVendidos)
      })
      })
      .catch(error => console.error("Error al obtener pedidos:", error));

      const borrar = await fetch("http://localhost:8080/api/pedidos/eliminar_todo", {
        method : "DELETE"
      })

      if (!borrar.ok) {
        throw new Error("Error al cerrar caja")
      }
      irADespachador();

    } else {
      alert("No se puede cerrar caja, porque no hay ventas actualmente")
    }}
  }
  
  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos", 
      { method: "GET" 
      })
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(error => console.error("Error al obtener pedidos:", error));
    }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/ventas_diarias", {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => setVentas(data))
    .catch(error => console.error("Error al cargar histórico de ventas:", error))
  }, [])

  const abrirVentana = (venta) => {
    const copy = JSON.parse(JSON.stringify(venta))
    setVentana(true);
    setVentaActual(copy);
    console.log(copy)
  }

  const cerrarVentana = () => {
    setVentana(false);
  }

  return (
    <>
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Cierre de caja</h1>
            <button
              onClick={()=> cerrarCaja(productosVendidos(pedidos))}
              className="bg-[#c41e3a] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow-md">
              Cerrar Caja
            </button>
          </div>

          {Array.isArray(pedidos) && Object.keys(productosVendidos(pedidos)).length > 0 ? (
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
            <p className="text-gray-600 text-center text-lg">No hay ventas hasta el momento en este día</p>
          )}

          <br></br>
          <h1 className="text-4xl font-bold text-gray-900">Histórico de Ventas</h1>
          <br></br>

          {Array.isArray(ventas) && ventas.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ventas.map((venta) => (
                <li key={venta.id} className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{venta.fecha}</h2>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-block bg-[#c41e3a] text-white font-semibold px-4 py-2 rounded-full">${venta.total}</span>
                    <button onClick={() => abrirVentana(venta)} className="text-sm border border-gray-300 text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition">Ver</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center text-lg">No hay ventas hasta el momento</p>
          )}
        </div>

        {ventanaEmergente && ventaActual && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={cerrarVentana}></div>
            <div className="bg-white rounded-lg w-full max-w-3xl p-10 z-10 shadow-lg overflow-y-auto max-h-[80vh]">
              <h3 className="text-xl font-bold mb-4">Ventas del día {ventaActual.fecha}</h3>
              <table className="w-full table-auto border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Producto</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Precio Unitario</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Cantidad Vendida</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                  {ventaActual.productosVendidos.map(p => {
                    return (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">$ {p.precio}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right"> {p.cantidad}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">$ {p.precio * p.cantidad}</td>
                      </tr>
                    )
                  })}
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">$ {ventaActual.total}</td>
                    </tr>
                </tbody>
              </table>
          </div>
        </div>
      )}
      </main>
    </>
  );
}

export default CierreCaja;