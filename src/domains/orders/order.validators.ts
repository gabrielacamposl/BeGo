import { z } from 'zod';


export const orderSchema = z.object({
user: z.string().length(24),
truck: z.string().length(24),
status: z.enum(['created','in transit','completed']).optional(),
pickup: z.string().length(24),
dropoff: z.string().length(24)
});


export const orderStatusSchema = z.object({
status: z.enum(['created','in transit','completed'])
});