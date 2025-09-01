import { Router } from 'express';
import userRoutes from '../domains/users/user.routes';
import truckRoutes from '../domains/trucks/truck.routes';
import orderRoutes from '../domains/orders/order.routes';
import locationRoutes from '../domains/location/location.routes';

const router = Router();

// Rutas de Users
router.use(userRoutes);
router.use(truckRoutes);
router.use(orderRoutes);
router.use(locationRoutes);

export default router;
