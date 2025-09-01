import { Schema, model, Document, Types } from 'mongoose';


export interface TruckDoc extends Document {
user: Types.ObjectId;
year: string;
color: string;
plates: string;
createdAt: Date;
updatedAt: Date;
}


const TruckSchema = new Schema<TruckDoc>({
user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
year: { type: String, required: true },
color: { type: String, required: true },
plates: { type: String, required: true, unique: true }
}, { timestamps: true });


export const Truck = model<TruckDoc>('Truck', TruckSchema);