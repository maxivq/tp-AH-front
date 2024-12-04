import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);
  const { getTotalQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada con éxito');
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">ElectroShop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/carrito">
                  Carrito ({getTotalQuantity()})
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  {userRole === 'admin' && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/agregar-producto">Agregar Producto</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={handleLogout}>Cerrar Sesión</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Registrarse</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;