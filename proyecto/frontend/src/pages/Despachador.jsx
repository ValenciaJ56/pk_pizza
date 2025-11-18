import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom'

function Despachador() {
  const navegar = useNavigate();

  const irAProductos = () => {
    navegar("/Productos");
  }

  return (
    <>
      <Header />
      <Navbar />

      <div>
        <button onClick={irAProductos} style={{color: "white"}}>Ver Productos</button>
      </div>      
    </>
  );
}

export default Despachador;
