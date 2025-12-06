import Inicio from "./pages/Inicio"
import Chef from "./pages/Chef"
import Despachador from "./pages/Despachador"
import Error from "./pages/Error"
import Menu from "./pages/Menu"
import Footer from "./components/footer"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import fondogrande from "./assets/fondogrande.jpg";
import Productos from "./pages/Productos"
import PedidosDashboard from "./components/PedidosDashboard"
import Pedidos from "./pages/Pedidos"

console.log(window.location.pathname);

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundImage: `url(${fondogrande})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Capa semitransparente para mejorar contraste del contenido */}
        <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/chef" element={<Chef />} />
                <Route path="/despachador" element={<Despachador />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/pedidos" element={<Pedidos />} />

                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App