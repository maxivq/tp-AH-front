import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const AgregarProducto = () => {
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: null
  });
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      imagen: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Obtener el token JWT del almacenamiento local
    const formData = new FormData();
    formData.append('nombre', product.nombre);
    formData.append('descripcion', product.descripcion);
    formData.append('precio', product.precio.replace(/\./g, '')); // Eliminar los puntos antes de enviar al backend
    formData.append('categoria', product.categoria);
    formData.append('imagen', product.imagen);

    try {
      const response = await fetch('http://localhost:3333/api/productos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Enviar el token JWT en el encabezado de autorización
        },
        body: formData
      });
      if (response.ok) {
        toast.success('Producto agregado con éxito');
        navigate('/productos');
      } else {
        const data = await response.json();
        toast.error('Error al agregar el producto: ' + data.message);
      }
    } catch (error) {
      toast.error('Error al agregar el producto: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={product.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={product.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="text"
            className="form-control"
            id="precio"
            name="precio"
            value={product.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            name="categoria"
            value={product.categoria}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            name="imagen"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;