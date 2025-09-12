'use server';

import { revalidatePath } from 'next/cache';
import { Order, OrderStatus, orderSchema } from './schema';
import { Customer } from '../customers/schema';
import { z } from 'zod';

let orders: Order[] = [];
let customers: Customer[] = [];

export async function getOrders() {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return orders;
}

export async function getCustomersForOrders(): Promise<Record<string, Customer>> {
    const customerMap: Record<string, Customer> = {};
    for (const customer of customers) {
        customerMap[customer.id] = customer;
    }
    return customerMap;
}

const updateOrderStatusSchema = z.object({
  orderId: z.string(),
  status: z.enum(['Spracováva sa', 'Odoslaná', 'Doručená', 'Zrušená']),
});

export async function updateOrderStatus(data: unknown) {
    const parsed = updateOrderStatusSchema.safeParse(data);
    if (!parsed.success) {
        return { success: false, error: parsed.error.flatten() };
    }

    const { orderId, status } = parsed.data;

    let updatedOrder: Order | undefined;

    orders = orders.map(o => {
        if (o.id === orderId) {
            updatedOrder = { ...o, status };
            return updatedOrder;
        }
        return o;
    });

    if (updatedOrder) {
        revalidatePath('/dashboard/orders');
        return { success: true, order: updatedOrder };
    }

    return { success: false, error: "Objednávka nebola nájdená" };
}
