import { Schema, model, Document, Types } from 'mongoose';

export interface LocationDoc extends Document {
  user: Types.ObjectId;
  address: string;
  place_id: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<LocationDoc>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  place_id: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
}, { timestamps: true });

export const Location = model<LocationDoc>('Location', LocationSchema);
