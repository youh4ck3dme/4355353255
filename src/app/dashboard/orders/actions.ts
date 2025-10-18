'use server';

import { revalidatePath } from 'next/cache';
import { Order, OrderStatus, orderSchema } from './schema';
import { Customer } from '../customers/schema';
import { z } from 'zod';

let customers: Customer[] = [
    {
        id: 'cust-1',
        name: 'Jana Nováková',
        email: 'jana.novakova@example.com',
        registrationDate: '2023-01-15',
        totalOrders: 5,
        totalSpent: 250.75,
    },
    {
        id: 'cust-2',
        name: 'Peter Kováč',
        email: 'peter.kovac@example.com',
        registrationDate: '2023-03-22',
        totalOrders: 2,
        totalSpent: 89.90,
    },
    {
        id: 'cust-3',
        name: 'Martin Krátky',
        email: 'martin.kratky@example.com',
        registrationDate: '2023-05-30',
        totalOrders: 8,
        totalSpent: 450.00,
    },
    {
        id: 'cust-4',
        name: 'Eva Dlhá',
        email: 'eva.dlha@example.com',
        registrationDate: '2023-08-10',
        totalOrders: 1,
        totalSpent: 19.99,
    },
    {
        id: 'cust-5',
        name: 'Lucia Veselá',
        email: 'lucia.vesela@example.com',
        registrationDate: '2023-11-02',
        totalOrders: 12,
        totalSpent: 1230.50,
    }
];

let orders: Order[] = [
    {
        id: 'ORD-001',
        customerId: 'cust-1',
        customerName: 'Jana Nováková',
        date: '2024-10-23',
        amount: 39.99,
        status: 'Doručená',
    },
    {
        id: 'ORD-002',
        customerId: 'cust-3',
        customerName: 'Martin Krátky',
        date: '2024-10-22',
        amount: 129.50,
        status: 'Odoslaná',
    },
    {
        id: 'ORD-003',
        customerId: 'cust-2',
        customerName: 'Peter Kováč',
        date: '2024-10-21',
        amount: 24.90,
        status: 'Spracováva sa',
    },
    {
        id: 'ORD-004',
        customerId: 'cust-5',
        customerName: 'Lucia Veselá',
        date: '2024-10-20',
        amount: 250.00,
        status: 'Doručená',
    },
    {
        id: 'ORD-005',
        customerId: 'cust-1',
        customerName: 'Jana Nováková',
        date: '2024-10-19',
        amount: 19.99,
        status: 'Zrušená',
    },
];

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
