'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product, ProductFormValues, productSchema } from '@/app/dashboard/products/schema';
import { addProduct, updateProduct } from '@/app/dashboard/products/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';


interface ProductFormDialogProps {
    isOpen: boolean;
    closeDialog: () => void;
    editingProduct: Product | null;
}

export function ProductFormDialog({ isOpen, closeDialog, editingProduct }: ProductFormDialogProps) {
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      sku: '',
      stock: 0,
    },
  });

  React.useEffect(() => {
    if (editingProduct) {
      form.reset({
        ...editingProduct,
        description: editingProduct.description || '',
        sku: editingProduct.sku || '',
      });
    } else {
      form.reset({
          name: '',
          description: '',
          price: 0,
          sku: '',
          stock: 0,
          category: 'doplnky',
      });
    }
  }, [editingProduct, form, isOpen]);

  function onSubmit(data: ProductFormValues) {
    startTransition(async () => {
      const result = editingProduct
        ? await updateProduct({ ...data, id: editingProduct.id })
        : await addProduct(data);

      if (result.success && result.product) {
        toast({
          title: editingProduct ? 'Produkt upravený' : 'Produkt pridaný',
          description: `Produkt "${result.product.name}" bol úspešne ${editingProduct ? 'upravený' : 'pridaný'}.`,
        });
        closeDialog();
      } else {
        toast({
          title: "Chyba",
          description: "Nepodarilo sa uložiť produkt.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[625px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Upraviť produkt' : 'Pridať nový produkt'}</DialogTitle>
              <DialogDescription>
                  {editingProduct ? 'Upravte detaily produktu.' : 'Vyplňte detaily o novom produkte.'} Kliknite na "Uložiť", keď budete hotoví.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Názov</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input placeholder="Názov produktu" {...field} />
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Popis</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Textarea placeholder="Podrobný popis produktu..." {...field} />
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Cena (€)</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="49.99" {...field} />
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">SKU</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input placeholder="PW-1000" {...field} />
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Na sklade</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Kategória</FormLabel>
                      <div className="col-span-3">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Vyberte kategóriu" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="doplnky">Doplnky</SelectItem>
                            <SelectItem value="oblecenie">Oblečenie</SelectItem>
                            <SelectItem value="vybavenie">Vybavenie</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>Zrušiť</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Ukladám...' : 'Uložiť produkt'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
