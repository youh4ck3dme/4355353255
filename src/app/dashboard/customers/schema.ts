import { z } from 'zod';

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  registrationDate: z.string(),
  totalOrders: z.number().int().nonnegative(),
  totalSpent: z.number().nonnegative(),
});

export type Customer = z.infer<typeof customerSchema>;
