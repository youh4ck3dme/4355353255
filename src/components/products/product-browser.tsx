'use client';

import * as React from 'react';
import Image from 'next/image';
import { products } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '../ui/card';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useToast } from '@/hooks/use-toast';


const getStatusVariant = (status: string): VariantProps<typeof badgeVariants>['variant'] => {
    switch (status) {
        case 'Aktívny': return 'default';
        case 'Koncept': return 'secondary';
        case 'Vypredaný': return 'destructive';
        default: return 'outline';
    }
}

const productSchema = z.object({
  name: z.string().min(3, { message: 'Názov musí mať aspoň 3 znaky.' }),
  description: z.string().optional(),
  price: z.coerce.number().positive({ message: 'Cena musí byť kladné číslo.' }),
  sku: z.string().optional(),
  stock: z.coerce.number().int().nonnegative({ message: 'Skladové zásoby nemôžu byť záporné.' }),
  category: z.enum(['doplnky', 'oblecenie', 'vybavenie'], { required_error: 'Musíte vybrať kategóriu.' }),
});

type ProductFormValues = z.infer<typeof productSchema>;


export function ProductBrowser() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
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

  function onSubmit(data: ProductFormValues) {
    console.log(data);
    toast({
      title: 'Produkt uložený',
      description: `Produkt "${data.name}" bol úspešne pridaný.`,
    });
    setIsDialogOpen(false);
    form.reset();
  }


  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelected(products.map((p) => p.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((pId) => pId !== id));
    }
  };

  const isAllSelected = selected.length === products.length;
  const isSomeSelected = selected.length > 0 && !isAllSelected;
  const selectAllState = isAllSelected ? true : isSomeSelected ? 'indeterminate' : false;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  return (
    <Card>
      <div className="flex items-center gap-4 p-4 border-b">
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Pridať produkt
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Pridať nový produkt</DialogTitle>
                    <DialogDescription>
                        Vyplňte detaily o novom produkte. Kliknite na "Uložiť", keď budete hotoví.
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
                                <Input type="number" placeholder="49.99" {...field} />
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
                      <Button type="submit">Uložiť produkt</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectAllState}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="w-[80px]">Obrázok</TableHead>
            <TableHead>Názov</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Na sklade</TableHead>
            <TableHead className="text-right">Cena</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(product.id)}
                  onCheckedChange={(checked) => handleSelect(product.id, !!checked)}
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell>
                <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    width={40} 
                    height={40}
                    className="rounded-md object-cover"
                    data-ai-hint="product image"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(product.status)}>{product.status}</Badge>
              </TableCell>
              <TableCell className="text-right">{product.stock > 0 ? product.stock : '–'}</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(product.price)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Upraviť</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Vymazať</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
