import express from "express";
import connectDB from "./db/db.js";
import productosRoute from "./api/routes/productos.routes.js";
import mainRoute from "./routes/productos.routes.js";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3333;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "views")));

// Rutas
app.use("/api", productosRoute);
app.use("/", mainRoute);

app.listen(port, () => console.log("Servidor funcionando en el puerto " + port));