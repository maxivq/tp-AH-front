import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Product.css'; // Importar el archivo CSS

const Product = ({ _id, nombre, descripcion, precio, categoria, imagen, onDelete, onEdit }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                if (!base64Url) {
                    throw new Error('Token JWT no tiene la parte esperada');
                }
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const user = JSON.parse(atob(base64)); // Decodificar el token JWT
                if (user && user.role) {
                    setUserRole(user.role);
                } else {
                    throw new Error('Token JWT no contiene la información esperada');
                }
            } catch (error) {
                console.error('Error al decodificar el token JWT:', error);
            }
        }
    }, []);

    return (
        <div className="card product-card">
            {imagen && <img src={`http://localhost:3333/uploads/${imagen}`} className="card-img-top product-img" alt={nombre} />}
            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text">{descripcion}</p>
                <p className="card-text">Precio: ${precio}</p>
                <p className="card-text">Categoría: {categoria}</p>
                <div className="card-buttons">
                    <Link to={`/productos/${_id}`} className="btn btn-primary me-2">Ver detalles</Link>
                    {userRole === 'admin' && (
                        <>
                            <button className="btn btn-danger me-2" onClick={() => onDelete(_id)}>Eliminar</button>
                            <button className="btn btn-warning" onClick={() => onEdit(_id)}>Editar</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;