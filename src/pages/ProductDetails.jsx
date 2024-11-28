import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productFromServer = await getProductById(id);
                setProduct(productFromServer);
            } catch (err) {
                setError('Error al obtener el producto');
            }
        };

        fetchProduct();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container product-details">
            <div className="row">
                <div className="col-md-6">
                    {product.imagen && <img src={`http://localhost:3333/uploads/${product.imagen}`} alt={product.nombre} className="img-fluid" />}
                </div>
                <div className="col-md-6">
                    <h1>{product.nombre}</h1>
                    <p className="lead">{product.descripcion}</p>
                    <p><strong>Precio:</strong> ${product.precio}</p>
                    <p><strong>Categoría:</strong> {product.categoria}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;