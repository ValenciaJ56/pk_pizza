import './LoginSignUp.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';


const LoginSignUp = () => {
  return (
    <div className='contenedor'>

        <div className="header">
            <div className="tex">Escoge tu perfil</div>
            <div className="underline"></div>
        </div>
        <div className="submit-contenedor">
            <div className="submit">Chef</div>
            <div className="submit">Despachador</div>

        </div>
      
    </div>
  )
}

export default LoginSignUp
