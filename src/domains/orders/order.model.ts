import { Schema, model, Document, Types } from 'mongoose';


export type OrderStatus = 'created' | 'in transit' | 'completed';


export interface OrderDoc extends Document {
user: Types.ObjectId;
truck: Types.ObjectId;
status: OrderStatus;
pickup: Types.ObjectId;
dropoff: Types.ObjectId;
createdAt: Date;
updatedAt: Date;
}


const OrderSchema = new Schema<OrderDoc>({
user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
truck: { type: Schema.Types.ObjectId, ref: 'Truck', required: true },
status: { type: String, enum: ['created','in transit','completed'], default: 'created' },
pickup: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
dropoff: { type: Schema.Types.ObjectId, ref: 'Location', required: true }
}, { timestamps: true });


export const Order = model<OrderDoc>('Order', OrderSchema);