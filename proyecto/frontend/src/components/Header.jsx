import logo from "../assets/logo.jpeg"

const Header = () => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="PK Pizza Logo" className="h-10 w-10 rounded-md" />
          <h1 className="text-3xl font-bold text-white">PK PIZZA</h1>
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="pk_pizza" className="text-white text-lg font-medium hover:text-[#c41e3a]">
                Inicio
              </a>
            </li>
            <li>
              <a href="pk_pizza/menu" className="text-white text-lg font-medium hover:text-[#c41e3a]">
                Menú
              </a>
            </li>
            {/*<li>
              <a href="" className="text-white text-lg font-medium hover:text-[#c41e3a]">
                Contacto
              </a>
            </li>
            <li>
              <a href="" className="text-white text-lg font-medium hover:text-[#c41e3a]">
                Enlace
              </a>
            </li>*/}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
