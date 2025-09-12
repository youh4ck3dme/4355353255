'use server';

import { revalidatePath } from 'next/cache';
import { customers as initialCustomers } from '@/lib/data';
import { Customer } from './schema';
import { z } from 'zod';

let customers: Customer[] = [...initialCustomers];

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
