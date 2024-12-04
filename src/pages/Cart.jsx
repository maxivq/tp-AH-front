import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="container my-5">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="cart-list row">
          {cart.map((producto) => (
            <div key={producto._id} className="cart-item card col-md-4 mb-4">
              <img src={`http://localhost:3333/uploads/${producto.imagen}`} className="card-img-top" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">${new Intl.NumberFormat('es-ES').format(producto.precio)}</p>
                <p className="card-text">Cantidad: {producto.quantity}</p>
                <button
                  onClick={() => removeFromCart(producto._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="d-flex justify-content-between mt-3">
          <button onClick={clearCart} className="btn btn-warning">
            Vaciar Carrito
          </button>
          <Link to="/productos" className="btn btn-primary">
            Seguir Comprando
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;