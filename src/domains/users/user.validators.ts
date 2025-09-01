import { z } from 'zod';


export const registerSchema = z.object({
email: z.string().email(),
password: z.string().min(8, 'Password mínimo 8 caracteres')
});


export const loginSchema = z.object({
email: z.string().email(),
password: z.string().min(8)
});