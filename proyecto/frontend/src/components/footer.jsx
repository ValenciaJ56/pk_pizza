import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p>&copy; {new Date().getFullYear()} Tu Sitio Web. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px 0',
  textAlign: 'center',
  marginTop: 'auto',
  width: '100%'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

export default Footer;