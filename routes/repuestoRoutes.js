import { Router } from 'express';
import { createRepuesto, deleteRepuesto, getRepuestoById, getRepuestos, updateRepuesto } from '../controllers/repuestoController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../helpers/multer.js';

const router = Router();

// router.post("/createRepuesto", authMiddleware, upload.single('image'), createRepuesto)
router.post("/createRepuesto", authMiddleware, createRepuesto)
// router.get("/getRepuestos", authMiddleware, getRepuestos);
// router.get("/getRepuestoById/:id", authMiddleware, getRepuestoById);
router.get("/getRepuestos", getRepuestos);
router.get("/getRepuestoById/:id", getRepuestoById);
// router.patch("/updateRepuesto/:id", authMiddleware, upload.single('image'), updateRepuesto);
router.patch("/updateRepuesto/:id", authMiddleware, updateRepuesto);
router.delete("/deleteRepuesto/:id", authMiddleware, deleteRepuesto);

export default router;