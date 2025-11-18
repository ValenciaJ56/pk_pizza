import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Imagen_inicio from "../components/InicioImagen";
import LoginSignUp from "../components/LoginSingUp/LoginSignUp";

function Inicio() {
  return (
    <>
      <Header />
      <Navbar />
      <Imagen_inicio />
      
      <div className="flex justify-center items-center mt-10">
        <LoginSignUp />
      </div>
    </>
  );
}

export default Inicio;
