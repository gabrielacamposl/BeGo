import { z } from 'zod';

export const locationSchema = z.object({
  place_id: z.string(),
});
