import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface UserDoc extends Document {
email: string;
password: string;
createdAt: Date;
updatedAt: Date;
comparePassword(candidate: string): Promise<boolean>;
}


const UserSchema = new Schema<UserDoc>({
email: {
type: String,
required: true,
unique: true,
lowercase: true,
trim: true,
index: true
},
password: { type: String, required: true, minlength: 8 }
}, { timestamps: true });


UserSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});


UserSchema.methods.comparePassword = function (candidate: string) {
return bcrypt.compare(candidate, this.password);
};


export const User = model<UserDoc>('User', UserSchema);