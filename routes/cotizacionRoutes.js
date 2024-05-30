import { Router } from "express";
const router = Router();

import { createCotizacion, deleteCotizacion, getCotizaciones, updateCotizacion } from "../controllers/cotizacionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/createCotizacion", createCotizacion)
router.get("/getCotizaciones", authMiddleware, getCotizaciones);
router.patch("/updateCotizacion/:id", authMiddleware, updateCotizacion);
router.delete("/deleteCotizacion/:id", authMiddleware, deleteCotizacion);

export default router;