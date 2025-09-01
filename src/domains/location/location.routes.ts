import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { createLocation, listLocations, getLocation, updateLocation, deleteLocation } from './location.controller';

const router = Router();

router.post('/locations', auth, createLocation);
router.get('/locations', auth, listLocations);
router.get('/locations/:id', auth, getLocation);
router.patch('/locations/:id', auth, updateLocation);
router.delete('/locations/:id', auth, deleteLocation);

export default router;
