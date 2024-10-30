import { Router } from "express";
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controllers/brand.controller.js";
const router = Router();

// Ruta para registrar una nueva marca
router.post('/createBrand', createBrand);

// Ruta para listar todas las marcas
router.get('/getBrands', getBrands);

// Ruta para obtener una marca por ID
router.get('/getBrand/:id', getBrand);

// Ruta para modificar una marca por ID
router.put('/updateBrand/:id', updateBrand);

// Ruta para eliminar una marca por ID
router.delete('/deleteBrand/:id', deleteBrand);

export default router;