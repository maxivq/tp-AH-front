import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../services/order.service';
import { toast } from 'react-toastify';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        toast.error('Error al obtener los pedidos: ' + error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container my-5">
      <h2>Mis Pedidos</h2>
      <ul className="list-group">
        {orders.map((order) => (
          <li key={order._id} className="list-group-item">
            Pedido #{order._id} - Total: ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrders;