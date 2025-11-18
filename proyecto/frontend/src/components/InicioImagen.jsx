import fondogrande from "../assets/fondogrande.jpg"

const Imagen_inicio = () => {
  return (
    <div className="contenedor-imagen h-96 bg-gray-300 flex justify-center items-center">
      <img src={fondogrande} alt="Imagen de inicio" />
    </div>
  )
}

export default Imagen_inicio
