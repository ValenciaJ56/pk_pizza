import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

function Prueba() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarMensaje = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/prueba", {
          method: "GET",
        });
        const texto = await res.text();
        setMensaje(texto);
      } catch (err) {
        console.error(err);
      }
    };

    cargarMensaje();
  }, []);

  return (
    <div>
      <h1 style={{ color: "white" }}>{mensaje}</h1>
      <Link to="/Prueba">Prueba</Link>
    </div>
  );
}

export default Prueba;
