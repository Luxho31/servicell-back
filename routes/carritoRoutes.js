import { Router } from 'express';
import {  } from '../controllers/repuestoController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { addCarritoItemByUserId, getCarritoItemsByUserId, getCarritoItemByUserId, updateCarritoItemByUserId, deleteCarritoItemByUserId, clearCarritoItemByUserId } from '../controllers/carritoController.js';

const router = Router();

router.post('/addCarritoItem', addCarritoItemByUserId);
router.get('/getCarritoItems/:userId', getCarritoItemsByUserId);
router.get('/getCarritoItem/:id/:userId', getCarritoItemByUserId);
router.put('/updateCarritoItem/:id/:userId', updateCarritoItemByUserId);
router.delete('/deleteCarritoItem/:carritoItemId/:userId', deleteCarritoItemByUserId);
router.delete('/clearCarritoItems/:userId', clearCarritoItemByUserId);

export default router;