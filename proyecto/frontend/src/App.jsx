import Inicio from "./pages/Inicio"
import Chef from "./pages/Chef"
import Despachador from "./pages/Despachador"
import Error from "./pages/Error"

import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import { BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Chef" element={<Chef />} />
            <Route path="/Despachador" element={<Despachador />} />

            <Route path="*" element={<Error />} />

            <Route path="/Prueba" element={<Navbar />} /> 
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App