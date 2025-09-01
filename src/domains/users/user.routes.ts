import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { register, login, getMe, listUsers, getUserById, updateUser, deleteUser } from './user.controller';

const router = Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);

// Users CRUD (protegido)
router.get('/users/me', auth, getMe);
router.get('/users', auth, listUsers);
router.get('/users/:id', auth, getUserById);
router.patch('/users/:id', auth, updateUser);
router.delete('/users/:id', auth, deleteUser);

export default router;
