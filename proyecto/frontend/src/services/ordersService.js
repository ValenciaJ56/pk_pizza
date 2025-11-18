import { 
  ref, 
  push, 
  onValue, 
  update, 
  remove,
  get,
  query,
  orderByChild,
  equalTo
} from 'firebase/database';
import { database } from '../config/firebaseConfig';

// Referencia a la colección de pedidos
const ordersRef = ref(database, 'orders');

/**
 * 📥 Escuchar cambios en pedidos en tiempo real
 * @param {Function} callback - Función que recibe el array de pedidos
 * @returns {Function} - Función para dejar de escuchar
 */
export const listenToOrders = (callback) => {
  return onValue(ordersRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Convertir objeto a array y ordenar por timestamp
      const ordersArray = Object.entries(data).map(([id, order]) => ({
        id,
        ...order
      })).sort((a, b) => b.timestamp - a.timestamp);
      callback(ordersArray);
    } else {
      callback([]);
    }
  });
};

/**
 * ➕ Crear nuevo pedido
 * @param {Object} orderData - Datos del pedido
 * @returns {Promise}
 */
export const createOrder = async (orderData) => {
  const newOrder = {
    ...orderData,
    status: 'waiting',
    timestamp: Date.now(),
    orderTime: new Date().toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };
  
  try {
    const newOrderRef = await push(ordersRef, newOrder);
    return { success: true, id: newOrderRef.key };
  } catch (error) {
    console.error('Error creando pedido:', error);
    return { success: false, error };
  }
};

/**
 * 🔄 Actualizar estado del pedido
 * @param {String} orderId - ID del pedido
 * @param {String} newStatus - Nuevo estado ('waiting', 'preparing', 'ready')
 * @returns {Promise}
 */
export const updateOrderStatus = async (orderId, newStatus) => {
  const orderRef = ref(database, `orders/${orderId}`);
  try {
    await update(orderRef, { status: newStatus });
    return { success: true };
  } catch (error) {
    console.error('Error actualizando estado:', error);
    return { success: false, error };
  }
};

/**
 * ✏️ Actualizar datos del pedido
 * @param {String} orderId - ID del pedido
 * @param {Object} updates - Objeto con los campos a actualizar
 * @returns {Promise}
 */
export const updateOrder = async (orderId, updates) => {
  const orderRef = ref(database, `orders/${orderId}`);
  try {
    await update(orderRef, updates);
    return { success: true };
  } catch (error) {
    console.error('Error actualizando pedido:', error);
    return { success: false, error };
  }
};

/**
 * 🗑️ Eliminar pedido
 * @param {String} orderId - ID del pedido
 * @returns {Promise}
 */
export const deleteOrder = async (orderId) => {
  const orderRef = ref(database, `orders/${orderId}`);
  try {
    await remove(orderRef);
    return { success: true };
  } catch (error) {
    console.error('Error eliminando pedido:', error);
    return { success: false, error };
  }
};

/**
 * 📊 Obtener pedidos por estado
 * @param {String} status - Estado a filtrar
 * @returns {Promise<Array>}
 */
export const getOrdersByStatus = async (status) => {
  const statusQuery = query(ordersRef, orderByChild('status'), equalTo(status));
  try {
    const snapshot = await get(statusQuery);
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([id, order]) => ({
        id,
        ...order
      }));
    }
    return [];
  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    return [];
  }
};

/**
 * 📖 Obtener un pedido específico
 * @param {String} orderId - ID del pedido
 * @returns {Promise<Object>}
 */
export const getOrderById = async (orderId) => {
  const orderRef = ref(database, `orders/${orderId}`);
  try {
    const snapshot = await get(orderRef);
    if (snapshot.exists()) {
      return { id: orderId, ...snapshot.val() };
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo pedido:', error);
    return null;
  }
};