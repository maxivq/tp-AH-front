import Producto from "../../models/producto.model.js";
import productoView from "../../views/producto.view.js";
import productoService from "../../services/producto.service.js"; // Asegúrate de que esta línea esté presente

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        const contenido = productoView.crearListaProductos(productos);
        const pagina = productoView.crearPagina("Lista de Productos", contenido);
        res.send(pagina);
    } catch (err) {
        res.status(500).send(productoView.crearPagina("Error", `<p>${err.message}</p>`));
    }
};

// Obtener un producto por ID
export const getProductoId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (producto == null) {
            return res.status(404).send(productoView.crearPagina("Error", "<p>No se encontró el producto</p>"));
        }
        const contenido = productoView.crearDetalleProducto(producto);
        const pagina = productoView.crearPagina("Detalle del Producto", contenido);
        res.send(pagina);
    } catch (err) {
        res.status(500).send(productoView.crearPagina("Error", `<p>${err.message}</p>`));
    }
};

// Agregar un nuevo producto
export const agregarProducto = async (req, res) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria
    });

    try {
        const nuevoProducto = await producto.save();
        const contenido = `<p>Producto agregado correctamente: ${nuevoProducto.nombre}</p>`;
        const pagina = productoView.crearPagina("Nuevo Producto", contenido);
        res.status(201).send(pagina);
    } catch (err) {
        res.status(400).send(productoView.crearPagina("Error", `<p>${err.message}</p>`));
    }
};

// Reemplazar un producto
export const reemplazarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, overwrite: true });
        if (producto == null) {
            return res.status(404).send(productoView.crearPagina("Error", "<p>No se encontró el producto</p>"));
        }
        const contenido = `<p>Producto reemplazado correctamente: ${producto.nombre}</p>`;
        const pagina = productoView.crearPagina("Producto Reemplazado", contenido);
        res.send(pagina);
    } catch (err) {
        res.status(400).send(productoView.crearPagina("Error", `<p>${err.message}</p>`));
    }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (producto == null) {
            return res.status(404).send(productoView.crearPagina("Error", "<p>No se encontró el producto</p>"));
        }
        const contenido = `<p>Producto actualizado correctamente: ${producto.nombre}</p>`;
        const pagina = productoView.crearPagina("Producto Actualizado", contenido);
        res.send(pagina);
    } catch (err) {
        res.status(400).send(productoView.crearPagina("Error", `<p>${err.message}</p>`));
    }
};

// Borrar un producto
export const borrarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (producto == null) {
            return res.status(404).send(productoView.crearPagina("Error", "<p>No se encontró el producto</p>"));
        }
        const contenido = `<p>Producto eliminado correctamente: ${producto.nombre}</p>`;
        const pagina = productoView.crearPagina("Producto Eliminado", contenido);
        res.send(pagina);
    } catch (err) {
        res.status(500).send(productoView.crearPagina("Error", `<p>${err.message}</p>`));
    }
};

// Función para filtrar productos
export const filtrarProductos = async (req, res) => {
    try {
        const filtros = req.query;
        const productos = await productoService.filtrarProductos(filtros);
        const contenido = productoView.crearListaProductos(productos);
        const pagina = productoView.crearPagina("Productos Filtrados", contenido);
        res.send(pagina);
    } catch (err) {
        res.status(500).send(productoView.crearPagina("Error", `<p>${err.message}</p>`));
    }
};