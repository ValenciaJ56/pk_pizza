import React from 'react';
import fondogrande from "../assets/fondogrande.jpg";

const Imagen_inicio = () => {
  return (
    <div className="relative w-full py-16 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-2" style={{ color: '#ffffff' }}>Bienvenido a PK Pizza</h1>
        <p className="text-lg" style={{ color: '#ffffff' }}>¡Un delicioso Pecado!</p>
      </div>
    </div>
  );
};

export default Imagen_inicio;