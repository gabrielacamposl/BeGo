import { Request, Response, NextFunction } from 'express';
import { Order } from './order.model';
import { orderSchema, orderStatusSchema } from './order.validators';


export async function createOrder(req: Request, res: Response, next: NextFunction) {
try {
const data = orderSchema.parse(req.body);
const order = await Order.create(data);
res.status(201).json({ order });
} catch (err) { next(err); }
}


export async function listOrders(req: Request, res: Response) {
const orders = await Order.find().sort({ createdAt: -1 });
res.json({ orders });
}


export async function getOrder(req: Request, res: Response) {
const order = await Order.findById(req.params.id);
if (!order) return res.status(404).json({ error: 'Order no encontrado' });
res.json({ order });
}


export async function updateOrder(req: Request, res: Response, next: NextFunction) {
try {
const data = orderSchema.partial().parse(req.body);
const order = await Order.findByIdAndUpdate(req.params.id, data, { new: true });
if (!order) return res.status(404).json({ error: 'Order no encontrado' });
res.json({ order });
} catch (err) { next(err); }
}


export async function deleteOrder(req: Request, res: Response) {
const order = await Order.findByIdAndDelete(req.params.id);
if (!order) return res.status(404).json({ error: 'Order no encontrado' });
res.status(204).send();
}


// Cambiar status
export async function changeOrderStatus(req: Request, res: Response, next: NextFunction) {
try {
const { status } = orderStatusSchema.parse(req.body);
const order = await Order.findById(req.params.id);
if (!order) return res.status(404).json({ error: 'Order no encontrado' });
order.status = status;
await order.save();
res.json({ order });
} catch (err) { next(err); }
}