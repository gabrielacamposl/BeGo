import dotenv from 'dotenv';

dotenv.config();

export const env = {
PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
NODE_ENV: process.env.NODE_ENV || 'development',
MONGODB_URI: process.env.MONGODB_URI || '',
JWT_SECRET: process.env.JWT_SECRET || '',
JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
};

if (!env.MONGODB_URI) throw new Error('MONGODB_URI no definido.');
if (!env.JWT_SECRET) throw new Error('JWT_SECRET no definido.');