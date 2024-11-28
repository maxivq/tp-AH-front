import { Router } from "express";
import * as controller from "../controllers/productos.controller.js";

const router = Router();

router.get("/productos/filtrar", controller.filtrarProductos);

router.get("/productos", controller.getProductos);
router.get("/productos/:id", controller.getProductoId);
router.post("/productos", controller.agregarProducto);
router.put("/productos/:id", controller.reemplazarProducto);
router.patch("/productos/:id", controller.actualizarProducto);
router.delete("/productos/:id", controller.borrarProducto);

export default router;