import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/order.service';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        toast.error('Error al obtener los detalles del pedido: ' + error.message);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container my-5">
      <h2>Detalles del Pedido #{order._id}</h2>
      <p>Total: ${order.total}</p>
      <p>Dirección: {order.address}</p>
      <ul className="list-group">
        {order.items.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.productName} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;