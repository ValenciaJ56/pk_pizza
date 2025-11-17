import React from 'react'

const Navbar = () => {
  return (
    //Pagina para una pizzeria
    <nav className="bg-gray-800  p-4 flex justify-between"> 
        <div className="text-white text-xl font-bold">Un pecado delicioso</div>
        <ul className="flex space-x-4 ">
            <li><a href="#" className=" text-white text-xl font-bold hover:text-[#c41e3a]">Inicio</a></li>
            <li><a href="#" className=" text-white text-xl font-bold hover:text-[#c41e3a]">Menú</a></li>
            <li><a href="#" className=" text-white text-xl font-bold hover:text-[#c41e3a]">Contacto</a></li>
            <li><a href="#" className=" text-white text-xl font-bold hover:text-[#c41e3a]">Enlace</a></li>
        </ul>
            
    </nav>
  )
}

export default Navbar
