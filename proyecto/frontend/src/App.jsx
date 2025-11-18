// ...existing code...
import Inicio from "./pages/Inicio"
import Chef from "./pages/Chef"
import Despachador from "./pages/Despachador"
import Error from "./pages/Error"
import Menu from "./pages/Menu"
import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import fondogrande from "./assets/fondogrande.jpg";
import Productos from "./pages/Productos"

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
                <Route path="/Menu" element={<Menu />} />
                <Route path="/Chef" element={<Chef />} />
                <Route path="/Despachador" element={<Despachador />} />
                <Route path="*" element={<Error />} />
                <Route path="/Productos" element={<Productos />} />
              </Routes>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App