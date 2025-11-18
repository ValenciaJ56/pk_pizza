import React from 'react';

const InstagramIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 11.998A4 4 0 1 1 8 12a4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
);

const WhatsAppIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 11.5A9.5 9.5 0 1 0 3 21l-1 3 3-1A9.5 9.5 0 0 0 21 11.5z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M15.2 13.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.1.2-.3.3-.6.1-1.2-.6-2-1.9-2.3-3.3-.1-.3 0-.5.2-.7.2-.2.5-.4.8-.6.3-.2.4-.3.6-.6.1-.2 0-.4-.1-.6-.2-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5-.2 0-.5 0-.8 0-.3 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.7 3.2 1.3 3.2.9 3.8.9.6 0 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.4z" fill="currentColor"/>
    </svg>
);

const PhoneIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a1 1 0 0 1 1 .75c.12.8.33 1.58.62 2.32a1 1 0 0 1-.23 1L7.5 8.5a13 13 0 0 0 6 6l1.43-1.43a1 1 0 0 1 1-.23c.74.29 1.52.5 2.32.62a1 1 0 0 1 .75 1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    </svg>
);

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={leftStyle}>
          <p style={infoItem}><strong>Teléfono:</strong> <a href="tel:+573000000000" style={linkStyle}>+57 300 000 0000</a></p>
          <p style={infoItem}><strong>Dirección:</strong> Calle Falsa 123, Ciudad</p>
          <p style={infoItem}><strong>Correo:</strong> <a href="mailto:hola@ejemplo.com" style={linkStyle}>hola@ejemplo.com</a></p>
        </div>

        <div style={rightStyle}>
          <a href="#" aria-label="Instagram" style={iconLink}><InstagramIcon size={22} /></a>
          <a href="#" aria-label="WhatsApp" style={iconLink}><WhatsAppIcon size={22} /></a>
          <a href="tel:+573000000000" aria-label="Teléfono" style={iconLink}><PhoneIcon size={20} /></a>
        </div>
      </div>

      <div style={copyrightStyle}>
        <p style={{ margin: 0, fontSize: 13 }}>&copy; {new Date().getFullYear()} Chupenlo.</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '40px 0',       // más alto
  textAlign: 'left',
  marginTop: 'auto',
  width: '100%',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap'
};

const leftStyle = {
  flex: '1 1 320px',
  minWidth: 220,
  color: '#fff'
};

const rightStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flex: '0 0 160px'
};

const infoItem = {
  margin: '6px 0',
  fontSize: 14
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'underline'
};

const iconLink = {
  display: 'inline-flex',
  width: 36,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  color: '#333',
  borderRadius: 8,
  textDecoration: 'none'
};

const copyrightStyle = {
  marginTop: 16,
  textAlign: 'center'
};
export default Footer   ;