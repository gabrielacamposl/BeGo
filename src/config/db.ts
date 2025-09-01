import mongoose = require('mongoose');
import {env} from './env';

export async function connectDB() {
mongoose.set('strictQuery', true);
await mongoose.connect(env.MONGODB_URI);
console.log('Conectado a la base de datos MongoDB.');
}