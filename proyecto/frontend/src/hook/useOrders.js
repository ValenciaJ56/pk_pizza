import { useState, useEffect } from 'react';
import { 
  listenToOrders, 
  updateOrderStatus, 
  deleteOrder 
} from '../services/ordersService';

/**
 * Hook personalizado para gestionar pedidos con Firebase
 */
export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Suscribirse a cambios en tiempo real
    const unsubscribe = listenToOrders((ordersData) => {
      setOrders(ordersData);
      setLoading(false);
    });

    // Cleanup: dejar de escuchar cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Función para cambiar estado de pedido
  const changeStatus = async (orderId, newStatus) => {
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (!result.success) {
        setError('Error al actualizar estado');
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    }
  };

  // Función para eliminar pedido
  const removeOrder = async (orderId) => {
    try {
      const result = await deleteOrder(orderId);
      if (!result.success) {
        setError('Error al eliminar pedido');
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    }
  };

  // Obtener conteo por estado
  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  // Filtrar pedidos por estado
  const getOrdersByStatus = (status) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  return {
    orders,
    loading,
    error,
    changeStatus,
    removeOrder,
    getStatusCount,
    getOrdersByStatus
  };
};