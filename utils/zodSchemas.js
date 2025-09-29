import { z } from "zod";

export const ReviewCreateSchema = z.object({
  name: z.string().min(2).max(80),
  company: z.string().max(120).optional(),
  email: z.string().email().optional(),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().min(10).max(1000),
  hp: z.string().max(0).optional().default("")  
});
