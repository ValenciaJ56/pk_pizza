const Header = () => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">PK PIZZA</h1>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-white text-lg font-medium hover:text-[#c41e3a]">
                Inicio
              </a>
            </li>
            <li>
              <a href="/menu" className="text-white text-lg font-medium hover:text-[#c41e3a]">
                Menú
              </a>
            </li>
            <li>
              <a href="/contacto" className="text-white text-lg font-medium hover:text-[#c41e3a]">
                Contacto
              </a>
            </li>
            <li>
              <a href="/otro" className="text-white text-lg font-medium hover:text-[#c41e3a]">
                Enlace
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
