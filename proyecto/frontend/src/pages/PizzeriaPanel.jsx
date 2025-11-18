import React, { useState } from 'react';
import { Clock, ChefHat, CheckCircle, Trash2, User, Phone, MapPin, CreditCard, Wallet, Wifi, AlertCircle } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';

const PizzeriaPanel = () => {
  const { 
    orders, 
    loading, 
    error, 
    changeStatus, 
    removeOrder, 
    getStatusCount,
    getOrdersByStatus 
  } = useOrders();
  
  const [activeTab, setActiveTab] = useState('all');

  // Componente de tarjeta de estadísticas
  const StatusCard = ({ icon: Icon, label, count, color }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold">{count}</p>
      </div>
      <div className={`${color} p-3 rounded-full`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
    </div>
  );

  // Componente de tarjeta de pedido
  const OrderCard = ({ order }) => {
    const statusConfig = {
      waiting: { 
        label: 'En Espera', 
        color: 'bg-blue-500', 
        nextStatus: 'preparing', 
        nextLabel: 'Iniciar Preparación' 
      },
      preparing: { 
        label: 'En Preparación', 
        color: 'bg-orange-500', 
        nextStatus: 'ready', 
        nextLabel: 'Marcar como Listo' 
      },
      ready: { 
        label: 'Listo', 
        color: 'bg-green-500', 
        nextStatus: null, 
        nextLabel: null 
      }
    };

    const config = statusConfig[order.status];

    return (
      <div className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <ChefHat className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Pedido #{order.id.slice(-6)}</h3>
              {order.status === 'preparing' && (
                <span className={`${config.color} text-white text-xs px-3 py-1 rounded-full inline-block mt-1`}>
                  {config.label}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{order.time || '0h 0min'}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4" />
            <span>{order.customer}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4" />
            <span>{order.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4" />
            <span>{order.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            {order.paymentMethod === 'Efectivo' ? 
              <Wallet className="w-4 h-4" /> : 
              <CreditCard className="w-4 h-4" />
            }
            <span>{order.paymentMethod}</span>
          </div>
        </div>

        <div className="border-t pt-4 mb-4">
          <p className="font-semibold mb-2 text-gray-700">Pizzas:</p>
          {order.items?.map((item, idx) => (
            <div key={idx} className="text-sm text-gray-600 mb-1">
              <span className="font-medium">{item.qty}x {item.name} ({item.size})</span>
              {item.extras && item.extras.length > 0 && (
                <div className="text-xs text-gray-500 ml-4">+ {item.extras.join(', ')}</div>
              )}
            </div>
          ))}
        </div>

        {order.note && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Nota:</span> {order.note}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Total:</p>
            <p className="text-2xl font-bold text-orange-600">
              ${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Hora: {order.orderTime}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          {config.nextStatus && (
            <button
              onClick={() => changeStatus(order.id, config.nextStatus)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              {config.nextLabel} →
            </button>
          )}
          <button
            onClick={() => {
              if (window.confirm('¿Seguro que deseas eliminar este pedido?')) {
                removeOrder(order.id);
              }
            }}
            className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-orange-500 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si existe
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Error de Conexión</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const filteredOrders = getOrdersByStatus(activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Panel de Gestión</h1>
              <p className="text-sm text-gray-500">Pizzería Bella Napoli</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-700">
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">Conectado</span>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition">
              + Nuevo Pedido
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard 
            icon={Clock} 
            label="En Espera" 
            count={getStatusCount('waiting')} 
            color="bg-blue-500"
          />
          <StatusCard 
            icon={ChefHat} 
            label="En Preparación" 
            count={getStatusCount('preparing')} 
            color="bg-orange-500"
          />
          <StatusCard 
            icon={CheckCircle} 
            label="Listos" 
            count={getStatusCount('ready')} 
            color="bg-green-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-4 px-6 font-semibold transition whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'text-orange-600 border-b-2 border-orange-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Todos ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('waiting')}
              className={`flex-1 py-4 px-6 font-semibold transition whitespace-nowrap ${
                activeTab === 'waiting' 
                  ? 'text-orange-600 border-b-2 border-orange-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              En Espera ({getStatusCount('waiting')})
            </button>
            <button
              onClick={() => setActiveTab('preparing')}
              className={`flex-1 py-4 px-6 font-semibold transition whitespace-nowrap ${
                activeTab === 'preparing' 
                  ? 'text-orange-600 border-b-2 border-orange-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              En Preparación ({getStatusCount('preparing')})
            </button>
            <button
              onClick={() => setActiveTab('ready')}
              className={`flex-1 py-4 px-6 font-semibold transition whitespace-nowrap ${
                activeTab === 'ready' 
                  ? 'text-orange-600 border-b-2 border-orange-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Listos ({getStatusCount('ready')})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No hay pedidos en esta categoría</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PizzeriaPanel;