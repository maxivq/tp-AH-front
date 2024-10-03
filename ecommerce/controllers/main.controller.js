import express from "express";
import path from "path";

const router = express.Router();

// Página principal
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Página de contacto
router.get("/contacto", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/contacto.html"));
});

export default router;