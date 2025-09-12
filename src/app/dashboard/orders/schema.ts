import * as z from 'zod';

export const orderStatusSchema = z.enum(['Spracováva sa', 'Odoslaná', 'Doručená', 'Zrušená']);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  date: z.string(),
  amount: z.number(),
  status: orderStatusSchema,
});

export type Order = z.infer<typeof orderSchema>;
