import { Router } from 'express';
import userRoutes from '../domains/users/user.routes';
import truckRoutes from '../domains/trucks/truck.routes';
import orderRoutes from '../domains/orders/order.routes';

const router = Router();

// Rutas de Users
router.use(userRoutes);
router.use(truckRoutes);
router.use(orderRoutes);

export default router;
