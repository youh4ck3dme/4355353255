'use server';

import { revalidatePath } from 'next/cache';
import { Product, productSchema } from './schema';
import { z } from 'zod';

// This is a temporary in-memory store.
// In a real application, you would use a database.
let products: Product[] = [];

export async function getProducts() {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return products;
}

const addProductSchema = productSchema;
export async function addProduct(data: unknown) {
  const parsed = addProductSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    status: parsed.data.stock > 0 ? 'Aktívny' : 'Vypredaný',
    imageUrl: `https://picsum.photos/seed/${Date.now()}/40/40`,
    ...parsed.data,
  };

  products = [newProduct, ...products];
  revalidatePath('/dashboard/products');

  return { success: true, product: newProduct };
}

const updateProductSchema = productSchema.extend({
  id: z.string(),
});
export async function updateProduct(data: unknown) {
  const parsed = updateProductSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const { id, ...productData } = parsed.data;

  products = products.map(p =>
    p.id === id ? { ...p, ...productData } : p
  );
  revalidatePath('/dashboard/products');

  return { success: true, product: products.find(p => p.id === id) };
}

const deleteProductSchema = z.object({
  id: z.string(),
});
export async function deleteProduct(data: unknown) {
  const parsed = deleteProductSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const { id } = parsed.data;
  const productName = products.find(p => p.id === id)?.name;

  products = products.filter(p => p.id !== id);
  revalidatePath('/dashboard/products');

  return { success: true, productName };
}
