import React, { useState } from 'react';
import { Clock, ChefHat, CheckCircle } from 'lucide-react';

const PedidosDashboard = () => {
  const [pedidos, setPedidos] = useState({
    enEspera: 1,
    enPreparacion: 1,
    listos: 1
  });

  const [filtroActivo, setFiltroActivo] = useState('todos');

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: '200px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const iconContainerStyle = (color) => ({
    backgroundColor: color,
    borderRadius: '50%',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px'
  });

  const tabStyle = (activo) => ({
    flex: 1,
    padding: '12px',
    backgroundColor: activo ? '#f0f0f0' : 'white',
    border: 'none',
    borderBottom: activo ? '3px solid #333' : '3px solid transparent',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: activo ? '600' : '400',
    transition: 'all 0.3s'
  });

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          marginBottom: '32px',
          color: '#333'
        }}>
          Panel de Pedidos
        </h1>

        {/* Cards de resumen */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Card En Espera */}
          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <div style={iconContainerStyle('#E3F2FD')}>
              <Clock size={28} color="#1976D2" />
            </div>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              margin: '0 0 8px 0' 
            }}>
              En Espera
            </p>
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: '700', 
              margin: 0,
              color: '#333'
            }}>
              {pedidos.enEspera}
            </h2>
          </div>

          {/* Card En Preparación */}
          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <div style={iconContainerStyle('#FFF3E0')}>
              <ChefHat size={28} color="#F57C00" />
            </div>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              margin: '0 0 8px 0' 
            }}>
              En Preparación
            </p>
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: '700', 
              margin: 0,
              color: '#333'
            }}>
              {pedidos.enPreparacion}
            </h2>
          </div>

          {/* Card Listos */}
          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <div style={iconContainerStyle('#E8F5E9')}>
              <CheckCircle size={28} color="#388E3C" />
            </div>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              margin: '0 0 8px 0' 
            }}>
              Listos
            </p>
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: '700', 
              margin: 0,
              color: '#333'
            }}>
              {pedidos.listos}
            </h2>
          </div>
        </div>

        {/* Tabs de filtro */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex' }}>
            <button 
              style={tabStyle(filtroActivo === 'todos')}
              onClick={() => setFiltroActivo('todos')}
            >
              Todos ({pedidos.enEspera + pedidos.enPreparacion + pedidos.listos})
            </button>
            <button 
              style={tabStyle(filtroActivo === 'espera')}
              onClick={() => setFiltroActivo('espera')}
            >
              En Espera ({pedidos.enEspera})
            </button>
            <button 
              style={tabStyle(filtroActivo === 'preparacion')}
              onClick={() => setFiltroActivo('preparacion')}
            >
              En Preparación ({pedidos.enPreparacion})
            </button>
            <button 
              style={tabStyle(filtroActivo === 'listos')}
              onClick={() => setFiltroActivo('listos')}
            >
              Listos ({pedidos.listos})
            </button>
          </div>
        </div>

        {/* Área de contenido según filtro */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          minHeight: '300px'
        }}>
          <p style={{ color: '#666', textAlign: 'center' }}>
            Mostrando pedidos: <strong>{filtroActivo === 'todos' ? 'Todos' : filtroActivo}</strong>
          </p>
          <p style={{ color: '#999', textAlign: 'center', marginTop: '16px' }}>
            Aquí se mostrarían los detalles de los pedidos filtrados
          </p>
        </div>
      </div>
    </div>
  );
};

export default PedidosDashboard;