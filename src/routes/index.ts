import { Router } from 'express';
import userRoutes from '../domains/users/user.routes';

const router = Router();

// Rutas de Users
router.use(userRoutes);

export default router;
