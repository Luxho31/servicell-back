import { Router } from 'express';
import { createOrder, failure, pending, success, receiveWebhook } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// router.post('/create-order', authMiddleware, createOrder);
router.post('/createOrden', createOrder);
router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);
router.post('/webhook', receiveWebhook);

export default router;