// OrderTimer.jsx
import { useState, useEffect } from 'react';

const OrderTimer = ({ orderId }) => {
  const [elapsed, setElapsed] = useState(0);
  const [startedAt, setStartedAt] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const storageKey = `order_${orderId}_startedAt`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      setStartedAt(Number(saved));
    } else {
      const now = Date.now();
      localStorage.setItem(storageKey, now.toString());
      setStartedAt(now);
    }
  }, [orderId]);

  useEffect(() => {
    if (!startedAt) return;

    const updateElapsed = () => setElapsed(Date.now() - startedAt);
    updateElapsed();
    const id = setInterval(updateElapsed, 1000);

    return () => clearInterval(id);
  }, [startedAt]);

  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const pad = (n) => n.toString().padStart(2, "0");

  return (
    <div className="mt-3 text-sm text-gray-600">
      ⏱️ Tiempo: {minutes} min {pad(seconds)}s
    </div>
  );
};

export default OrderTimer;