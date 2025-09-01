import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { createTruck, listTrucks, getTruck, updateTruck, deleteTruck } from './truck.controller';


const router = Router();


router.post('/trucks', auth, createTruck);
router.get('/trucks', auth, listTrucks);
router.get('/trucks/:id', auth, getTruck);
router.patch('/trucks/:id', auth, updateTruck);
router.delete('/trucks/:id', auth, deleteTruck);


export default router;