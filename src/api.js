export const getProducts = async () => {
    const response = await fetch('http://localhost:3333/api/productos');
    if (!response.ok) {
        throw new Error('Error al obtener los productos');
    }
    return await response.json();
};

export const getProductById = async (id) => {
    const response = await fetch(`http://localhost:3333/api/productos/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener el producto');
    }
    return await response.json();
};