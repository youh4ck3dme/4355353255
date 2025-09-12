'use client';

import * as React from 'react';
import Image from 'next/image';
import { products as initialProducts } from '@/lib/data';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Product, ProductFormValues, productSchema } from '@/app/dashboard/products/schema';

const getStatusVariant = (status: string): VariantProps<typeof badgeVariants>['variant'] => {
    switch (status) {
        case 'Aktívny': return 'default';
        case 'Koncept': return 'secondary';
        case 'Vypredaný': return 'destructive';
        default: return 'outline';
    }
}

export function ProductBrowser({ products: serverProducts }: { products: Product[] }) {
  const [products, setProducts] = React.useState(serverProducts);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = React.useState<Product | null>(null);

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
    setProducts(serverProducts);
  }, [serverProducts]);

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
  }, [editingProduct, form]);

  function onSubmit(data: ProductFormValues) {
    const toastTitle = editingProduct ? 'Produkt upravený' : 'Produkt pridaný';
    const toastDescription = `Produkt "${data.name}" bol úspešne ${editingProduct ? 'upravený' : 'pridaný'}.`;
    
    if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data, id: editingProduct.id } : p));
    } else {
        const newProduct: Product = { 
            ...data, 
            id: `prod-${Date.now()}`, 
            status: 'Aktívny', 
            imageUrl: `https://picsum.photos/seed/${Date.now()}/40/40`, 
            description: data.description || null, 
            sku: data.sku || null 
        };
        setProducts([newProduct, ...products]);
    }
    
    toast({
      title: toastTitle,
      description: toastDescription,
    });

    closeDialog();
  }
  
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  }

  const handleDeleteConfirm = () => {
    if (deletingProduct) {
        setProducts(products.filter(p => p.id !== deletingProduct.id));
        toast({
            title: "Produkt vymazaný",
            description: `Produkt "${deletingProduct.name}" bol úspešne vymazaný.`,
            variant: "destructive"
        });
        setDeletingProduct(null);
    }
  }
  
  const closeDialog = () => {
      setIsDialogOpen(false);
      setEditingProduct(null);
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

  const isAllSelected = products.length > 0 && selected.length === products.length;
  const isSomeSelected = selected.length > 0 && !isAllSelected;
  const selectAllState = isAllSelected ? true : isSomeSelected ? 'indeterminate' : false;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  return (
    <>
    <Card>
      <div className="flex items-center gap-4 p-4 border-b">
         <Dialog open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
            <DialogTrigger asChild>
                <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Pridať produkt
                </Button>
            </DialogTrigger>
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
                    <DropdownMenuItem onClick={() => handleEdit(product)}><Edit className="mr-2 h-4 w-4" />Upraviť</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => setDeletingProduct(product)}><Trash2 className="mr-2 h-4 w-4" />Vymazať</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {products.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            Žiadne produkty sa nenašli.
          </div>
        )}
    </Card>
     <AlertDialog open={!!deletingProduct} onOpenChange={(isOpen) => !isOpen && setDeletingProduct(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Naozaj chcete vymazať tento produkt?</AlertDialogTitle>
            <AlertDialogDescription>
                Táto akcia je trvalá a nemožno ju vrátiť späť. Produkt "{deletingProduct?.name}" bude natrvalo odstránený.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Zrušiť</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Vymazať</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
