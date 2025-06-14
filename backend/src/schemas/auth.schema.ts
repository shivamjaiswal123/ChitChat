import { z } from 'zod';

export const authSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be 6 or more characters long' }),
});
