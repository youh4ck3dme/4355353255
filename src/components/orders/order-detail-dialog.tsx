'use client';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
import type { Order, OrderStatus } from '@/app/dashboard/orders/schema';
import type { Customer } from '@/app/dashboard/customers/schema';
import { updateOrderStatus } from '@/app/dashboard/orders/actions';
import { useToast } from '@/hooks/use-toast';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

interface OrderDetailDialogProps {
    isOpen: boolean;
    closeDialog: () => void;
    order: Order;
    customer: Customer | null;
}

export function OrderDetailDialog({ isOpen, closeDialog, order, customer }: OrderDetailDialogProps) {
  const [currentOrder, setCurrentOrder] = React.useState(order);
  const router = useRouter();
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: OrderStatus) => {
    startTransition(async () => {
      const result = await updateOrderStatus({ orderId: currentOrder.id, status: newStatus });
      if (result.success && result.order) {
          setCurrentOrder(result.order);
          toast({
            title: "Status aktualizovaný",
            description: `Status objednávky ${result.order.id} bol zmenený na "${result.order.status}".`,
          });
          // Revalidate data on the page
          router.refresh();
      } else {
          toast({
            title: "Chyba",
            description: "Nepodarilo sa aktualizovať status objednávky.",
            variant: "destructive"
          });
      }
    });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail objednávky {currentOrder?.id}</DialogTitle>
          <DialogDescription>
            Prehľad objednávky a informácie o zákazníkovi.
          </DialogDescription>
        </DialogHeader>
        {currentOrder && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Zákazník</h3>
                <p>{customer?.name}</p>
                <p className="text-sm text-muted-foreground">{customer?.email}</p>
                <p className="text-sm text-muted-foreground">Doručovacia adresa...</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Súhrn</h3>
                <p><strong>Dátum:</strong> {currentOrder.date}</p>
                <p><strong>Suma:</strong> <span className="font-bold">{formatCurrency(currentOrder.amount)}</span></p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Položky v objednávke</h3>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Produkt</TableHead>
                          <TableHead>Počet</TableHead>
                          <TableHead className="text-right">Cena</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      <TableRow>
                          <TableCell>Vzorový produkt 1</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell className="text-right">{formatCurrency(50)}</TableCell>
                      </TableRow>
                       <TableRow>
                          <TableCell>Vzorový produkt 2</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell className="text-right">{formatCurrency(25.50)}</TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
            </div>
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">Status objednávky</h3>
               <Select value={currentOrder.status} onValueChange={(value: OrderStatus) => handleStatusChange(value)}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Zmeniť status" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Spracováva sa">Spracováva sa</SelectItem>
                      <SelectItem value="Odoslaná">Odoslaná</SelectItem>
                      <SelectItem value="Doručená">Doručená</SelectItem>
                      <SelectItem value="Zrušená">Zrušená</SelectItem>
                  </SelectContent>
              </Select>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>Zavrieť</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
