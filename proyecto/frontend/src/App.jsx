import Inicio from "./pages/Inicio"
import Chef from "./pages/Chef"
import Despachador from "./pages/Despachador"

import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Despachador from "./pages/Despachador"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Chef" element={<Chef />} />
        <Route path="/Despachador" element={<Despachador />} />
        <Route path="/Prueba" element={<Navbar />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App