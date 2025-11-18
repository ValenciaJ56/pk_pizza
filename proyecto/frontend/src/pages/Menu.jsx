import Navbar from "../components/Navbar";
import Header from "../components/Header";
import menuImage from "../assets/MenuWide.jpg";

function Menu() {
  return (
    <>
      <Header />
      <Navbar />
      
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: 'rgba(0,0,0,0.45)'
      }}>
        <div style={{
          width: '90%',
          maxWidth: '1000px',
          backgroundImage: `url(${menuImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          aspectRatio: '16/9'
        }}>
        </div>
      </div>
    </>
  );
}

export default Menu;