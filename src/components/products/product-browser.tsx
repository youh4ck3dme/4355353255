'use client';

import * as React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from '../ui/card';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { Product, ProductFormValues } from '@/app/dashboard/products/schema';
import { deleteProduct } from '@/app/dashboard/products/actions';
import { startTransition } from 'react';
import { Skeleton } from '../ui/skeleton';

const ProductFormDialog = dynamic(() => import('./product-form-dialog').then(mod => mod.ProductFormDialog), {
    ssr: false,
    loading: () => <div className="p-8 text-center">Načítavam formulár...</div>
});

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

  React.useEffect(() => {
    setProducts(serverProducts);
  }, [serverProducts]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  }

  const handleDeleteConfirm = () => {
    if (deletingProduct) {
      startTransition(async () => {
        const result = await deleteProduct({ id: deletingProduct.id });
        if (result.success) {
           toast({
              title: "Produkt vymazaný",
              description: `Produkt "${result.productName}" bol úspešne vymazaný.`,
              variant: "destructive"
           });
        } else {
          toast({
            title: "Chyba",
            description: "Nepodarilo sa vymazať produkt.",
            variant: "destructive",
          });
        }
        setDeletingProduct(null);
      });
    }
  }
  
  const closeDialog = () => {
      setIsDialogOpen(false);
      setEditingProduct(null);
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
          <Button size="sm" onClick={() => { setEditingProduct(null); setIsDialogOpen(true); }}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Pridať produkt
          </Button>
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
      
      {isDialogOpen && (
        <ProductFormDialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            editingProduct={editingProduct}
        />
      )}

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
