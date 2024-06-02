import { Router } from "express";
const router = Router();

import { createCotizacion, deleteCotizacion, getCotizaciones, updateCotizacion, sentEmail, generateInvoice } from "../controllers/cotizacionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/createCotizacion", createCotizacion)
router.get("/getCotizaciones", authMiddleware, getCotizaciones);
router.patch("/updateCotizacion/:id", authMiddleware, updateCotizacion);
router.delete("/deleteCotizacion/:id", authMiddleware, deleteCotizacion);

router.post("/send-email/:id", authMiddleware, sentEmail);
router.post("/invoice/:id", authMiddleware, generateInvoice);

export default router;