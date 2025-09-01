import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { createOrder, listOrders, getOrder, updateOrder, deleteOrder, changeOrderStatus } from './order.controller';


const router = Router();


router.post('/orders', auth, createOrder);
router.get('/orders', auth, listOrders);
router.get('/orders/:id', auth, getOrder);
router.patch('/orders/:id', auth, updateOrder);
router.delete('/orders/:id', auth, deleteOrder);
router.patch('/orders/:id/status', auth, changeOrderStatus);


export default router;