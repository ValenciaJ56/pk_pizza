import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navegar = useNavigate();
  
  const irAInicio = () => {
    navegar("/");
  }

  return (
    //Pagina para una pizzeria
    <h1 className="bg-[#c41e3a] p-2"></h1>

  )
}

export default Navbar
