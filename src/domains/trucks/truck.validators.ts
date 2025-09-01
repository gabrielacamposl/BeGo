import { z } from 'zod';


export const truckSchema = z.object({
user: z.string().length(24, 'user debe ser ObjectId válido'),
year: z.string(),
color: z.string(),
plates: z.string()
});