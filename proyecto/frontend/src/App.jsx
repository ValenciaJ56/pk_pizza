import Inicio from "./pages/Inicio"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Chef" element={<Inicio />} />
        <Route path="/Despachador" element={<Inicio />} />
        <Route path="/Prueba" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App