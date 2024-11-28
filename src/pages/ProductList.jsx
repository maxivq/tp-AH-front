import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer'; // Importar el componente Footer
import '../styles/ProductList.css';

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const { userRole } = useContext(AuthContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/productos');
        const data = await response.json();
        if (response.ok) {
          setProductos(data);
          const categoriasUnicas = [...new Set(data.map(producto => producto.categoria))];
          setCategorias(categoriasUnicas);
        } else {
          toast.error('Error al buscar productos: ' + data.message);
        }
      } catch (error) {
        toast.error('Error al buscar productos: ' + error.message);
      }
    };

    fetchProductos();
  }, []);

  const handleCategoriaChange = async (categoria) => {
    setCategoriaSeleccionada(categoria);
    if (categoria === '') {
      const response = await fetch('http://localhost:3333/api/productos');
      const data = await response.json();
      if (response.ok) {
        setProductos(data);
      } else {
        toast.error('Error al buscar productos: ' + data.message);
      }
    } else {
      const response = await fetch(`http://localhost:3333/api/productos/category/${categoria}`);
      const data = await response.json();
      if (response.ok) {
        setProductos(data);
      } else {
        toast.error('Error al buscar productos: ' + data.message);
      }
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Obtener el token JWT del almacenamiento local
    try {
      const response = await fetch(`http://localhost:3333/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Enviar el token JWT en el encabezado de autorización
        }
      });
      if (response.ok) {
        setProductos(productos.filter((producto) => producto._id !== id));
        toast.success('Producto eliminado con éxito');
      } else {
        const data = await response.json();
        toast.error('Error al eliminar el producto: ' + data.message);
      }
    } catch (error) {
      toast.error('Error al eliminar el producto: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Productos</h2>
      <div className="mb-3">
        <label htmlFor="categoria" className="form-label">Filtrar por categoría:</label>
        <select
          id="categoria"
          className="form-select"
          value={categoriaSeleccionada}
          onChange={(e) => handleCategoriaChange(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      {userRole === 'admin' && (
        <Link to="/agregar-producto" className="btn btn-primary mb-3">
          Agregar Producto
        </Link>
      )}
      <div className="product-list">
        {productos.map((producto) => (
          <div key={producto._id} className="product-item card">
            <img src={`http://localhost:3333/uploads/${producto.imagen}`} className="card-img-top" alt={producto.nombre} />
            <div className="card-body">
              <h5 className="card-title">{producto.nombre}</h5>
              <p className="card-text">{producto.descripcion}</p>
              <p className="card-text">${new Intl.NumberFormat('es-ES').format(producto.precio)}</p>
              <Link to={`/productos/${producto._id}`} className="btn btn-primary">Ver Detalle</Link>
              {userRole === 'admin' && (
                <div className="btn-group" role="group">
                  <Link to={`/editar-producto/${producto._id}`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(producto._id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      <Footer />
      </div>
    </div>
  );
};

export default ProductList;