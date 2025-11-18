import Inicio from "./pages/Inicio"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import PizzeriaPanel from './pages/PizzeriaPanel'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Chef" element={<Inicio />} />
        <Route path="/Despachador" element={<Inicio />} />
        <Route path="/Prueba" element={<Navbar />} />
        <Route path="/Chef" element={<PizzeriaPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App