import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, { message: 'Názov musí mať aspoň 3 znaky.' }),
  description: z.string().optional(),
  price: z.coerce.number().positive({ message: 'Cena musí byť kladné číslo.' }),
  sku: z.string().optional(),
  stock: z.coerce.number().int().nonnegative({ message: 'Skladové zásoby nemôžu byť záporné.' }),
  category: z.enum(['doplnky', 'oblecenie', 'vybavenie'], { required_error: 'Musíte vybrať kategóriu.' }),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export type Product = ProductFormValues & {
    id: string;
    status: 'Aktívny' | 'Koncept' | 'Vypredaný';
    imageUrl: string;
    description: string | null;
    sku: string | null;
}
