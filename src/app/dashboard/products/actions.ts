'use server';

import { revalidatePath } from 'next/cache';
import { Product, productSchema } from './schema';
import { z } from 'zod';

// This is a temporary in-memory store.
// In a real application, you would use a database.
let products: Product[] = [
    {
        id: "prod-1",
        name: "Srvátkový proteín (Čokoláda)",
        description: "Vysokokvalitný srvátkový proteín s lahodnou čokoládovou príchuťou. Ideálny pre rast a regeneráciu svalov.",
        price: 39.99,
        sku: "WP-CH-1000",
        stock: 150,
        category: "doplnky",
        status: "Aktívny",
        imageUrl: "https://picsum.photos/seed/p1/40/40"
    },
    {
        id: "prod-2",
        name: "Kreatín monohydrát",
        description: "Čistý kreatín monohydrát pre zvýšenie sily, výkonu a svalového objemu. Mikronizovaný pre lepšiu rozpustnosť.",
        price: 24.90,
        sku: "CM-500",
        stock: 200,
        category: "doplnky",
        status: "Aktívny",
        imageUrl: "https://picsum.photos/seed/p2/40/40"
    },
    {
        id: "prod-3",
        name: 'Bežecké tenisky "Flow"',
        description: "Ultraľahké bežecké tenisky s priedušným zvrškom a dynamickým odpružením pre maximálny komfort.",
        price: 129.50,
        sku: "SHOE-RUN-42",
        stock: 0,
        category: "oblecenie",
        status: "Vypredaný",
        imageUrl: "https://picsum.photos/seed/p3/40/40"
    },
    {
        id: "prod-4",
        name: "Kompresné tričko",
        description: "Funkčné kompresné tričko, ktoré podporuje svaly, odvádza pot a zvyšuje výkonnosť počas tréningu.",
        price: 35.00,
        sku: "TS-COMP-M",
        stock: 80,
        category: "oblecenie",
        status: "Aktívny",
        imageUrl: "https://picsum.photos/seed/p4/40/40"
    },
    {
        id: "prod-5",
        name: "Sada odporových gúm",
        description: "Sada piatich odporových gúm s rôznymi úrovňami záťaže, ideálna pre rehabilitáciu aj posilňovanie.",
        price: 19.99,
        sku: "RB-SET-5",
        stock: 300,
        category: "vybavenie",
        status: "Aktívny",
        imageUrl: "https://picsum.photos/seed/p5/40/40"
    },
     {
        id: "prod-6",
        name: 'Šejker "WOOPANEL"',
        description: "Štýlový šejker s objemom 600 ml, logom WOOPANEL a praktickým sitkom proti hrudkám.",
        price: 9.90,
        sku: "SHAKER-600",
        stock: 50,
        category: "vybavenie",
        status: "Koncept",
        imageUrl: "https://picsum.photos/seed/p6/40/40"
    }
];

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
