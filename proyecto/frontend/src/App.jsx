import Inicio from "./pages/Inicio"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Chef" element={<Inicio />} />
        <Route path="/Despachador" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App