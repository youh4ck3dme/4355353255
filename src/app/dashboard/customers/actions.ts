'use server';

import { revalidatePath } from 'next/cache';
import { Customer } from './schema';
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

const getCustomersSchema = z.object({
    query: z.string().optional(),
});

export async function getCustomers(query?: string) {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (query) {
    const lowercasedQuery = query.toLowerCase();
    return customers.filter(
      c => c.name.toLowerCase().includes(lowercasedQuery) || c.email.toLowerCase().includes(lowercasedQuery)
    );
  }

  return customers;
}
