import { Router } from 'express';
import { createRepuesto, deleteRepuesto, getRepuestoById, getRepuestos, updateRepuesto } from '../controllers/repuestoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post("/createRepuesto", authMiddleware, createRepuesto)
router.get("/getRepuestos", authMiddleware, getRepuestos);
router.get("/getRepuestoById/:id", authMiddleware, getRepuestoById);
router.patch("/updateRepuesto/:id", authMiddleware, updateRepuesto);
router.delete("/deleteRepuesto/:id", authMiddleware, deleteRepuesto);

export default router;