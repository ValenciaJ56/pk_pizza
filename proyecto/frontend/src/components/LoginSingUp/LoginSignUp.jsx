import './LoginSignUp.css'
import { useNavigate } from 'react-router-dom'

const LoginSignUp = () => {
  const navegar = useNavigate();

  const irAChef = () => {
    navegar("/chef");
  }

  const irADespachador = () => {
    navegar("/despachador");
  }

  return (
    <div className='contenedor'>

        <div className="header">
            <div className="tex">Escoge tu perfil</div>
            <div className="underline"></div>
        </div>
        <div className="submit-contenedor">
            <div className="submit" onClick={irAChef}>Chef</div>
            <div className="submit" onClick={irADespachador}>Despachador</div>
        </div>
      
    </div>
  )
}

export default LoginSignUp
