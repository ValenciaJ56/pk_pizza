import { useEffect, useState } from "react";

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
    <h1 style={{ color: "white" }}>{mensaje}</h1>
  );
}

export default Prueba;
