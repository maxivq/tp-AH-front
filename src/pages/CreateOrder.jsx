import React, { useState } from 'react';
import { createOrder } from '../services/order.service';
import { toast } from 'react-toastify';

const CreateOrder = () => {
  const [orderData, setOrderData] = useState({
    items: [],
    total: 0,
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrder(orderData);
      toast.success('Pedido creado con éxito');
      console.log('Pedido creado:', response);
    } catch (error) {
      toast.error('Error al crear el pedido: ' + error.message);
    }
  };

  return (
    <div className="container my-5">
      <h2>Crear Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={orderData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Pedido</button>
      </form>
    </div>
  );
};

export default CreateOrder;