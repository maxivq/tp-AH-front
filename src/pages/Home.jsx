import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { getProductos } from '../services/producto.service';
import Footer from '../components/Footer';

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos(3); // Limitar a 3 productos
        setProductos(data);
      } catch (error) {
        console.error('Error al buscar productos: ' + error.message);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="container my-5 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">Bienvenido a ElectroShop</h1>
        <p className="lead text-muted">Tu tienda de confianza para lo último en electrónica.</p>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-6 text-center">
          <h2>Encuentra tus gadgets favoritos</h2>
          <p>
            Ofrecemos una amplia gama de productos electrónicos de alta calidad, desde smartphones
            hasta televisores de última generación. ¡Descubre ofertas exclusivas y compra con
            confianza!
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg mt-3">
            Ver Productos
          </Link>
        </div>
      </div>
      <div className="mt-5 text-center">
        <h3 className="mb-3">¡Explora nuestros productos más populares!</h3>
        <div className="product-list">
          {productos.map((producto) => (
            <div key={producto._id} className="product-item card">
              <img
                src={`http://localhost:3333/uploads/${producto.imagen}`}
                alt={producto.nombre}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">${new Intl.NumberFormat('es-ES').format(producto.precio)}</p>
                <Link to={`/productos/${producto._id}`} className="btn btn-primary">
                  Ver Producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;