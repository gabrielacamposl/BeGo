import { Request, Response, NextFunction } from 'express';
import { Truck } from './truck.model';
import { truckSchema } from './truck.validators';


export async function createTruck(req: Request, res: Response, next: NextFunction) {
try {
const data = truckSchema.parse(req.body);
const truck = await Truck.create(data);
res.status(201).json({ truck });
} catch (err) { next(err); }
}


export async function listTrucks(req: Request, res: Response) {
const trucks = await Truck.find().sort({ createdAt: -1 });
res.json({ trucks });
}


export async function getTruck(req: Request, res: Response) {
const truck = await Truck.findById(req.params.id);
if (!truck) return res.status(404).json({ error: 'Truck no encontrado' });
res.json({ truck });
}


export async function updateTruck(req: Request, res: Response, next: NextFunction) {
try {
const data = truckSchema.partial().parse(req.body);
const truck = await Truck.findByIdAndUpdate(req.params.id, data, { new: true });
if (!truck) return res.status(404).json({ error: 'Truck no encontrado' });
res.json({ truck });
} catch (err) { next(err); }
}


export async function deleteTruck(req: Request, res: Response) {
const truck = await Truck.findByIdAndDelete(req.params.id);
if (!truck) return res.status(404).json({ error: 'Truck no encontrado' });
res.status(204).send();
}