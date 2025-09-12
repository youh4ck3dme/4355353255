'use client';

import * as React from 'react';
import type { Order, OrderStatus } from '@/app/dashboard/orders/schema';
import type { Customer } from '@/app/dashboard/customers/schema';
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
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { updateOrderStatus } from '@/app/dashboard/orders/actions';
import { useToast } from '@/hooks/use-toast';
import { startTransition } from 'react';
import { OrderTable } from './order-table';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';

export function OrderBrowser({ orders: initialOrders, customers: initialCustomers }: { orders: Order[], customers: Record<string, Customer> }) {
  const [orders, setOrders] = React.useState(initialOrders);
  const [customers, setCustomers] = React.useState(initialCustomers);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    setOrders(initialOrders);
    setCustomers(initialCustomers);
  }, [initialOrders, initialCustomers]);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (selectedOrder) {
      startTransition(async () => {
        const result = await updateOrderStatus({ orderId: selectedOrder.id, status: newStatus });
        if (result.success && result.order) {
            const updatedOrder = result.order;
            // Update local state
            setOrders(prevOrders => 
              prevOrders.map(o => o.id === updatedOrder.id ? updatedOrder : o)
            );
            setSelectedOrder(updatedOrder);
            toast({
              title: "Status aktualizovaný",
              description: `Status objednávky ${updatedOrder.id} bol zmenený na "${updatedOrder.status}".`,
            });
        } else {
            toast({
              title: "Chyba",
              description: "Nepodarilo sa aktualizovať status objednávky.",
              variant: "destructive"
            });
        }
      });
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
  }
  
  const customerDetails = selectedOrder ? customers[selectedOrder.customerId] : null;

  return (
    <>
      <Card>
        <OrderTable orders={orders} onRowClick={handleRowClick} />
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail objednávky {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Prehľad objednávky a informácie o zákazníkovi.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Zákazník</h3>
                  <p>{customerDetails?.name}</p>
                  <p className="text-sm text-muted-foreground">{customerDetails?.email}</p>
                  <p className="text-sm text-muted-foreground">Doručovacia adresa...</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Súhrn</h3>
                  <p><strong>Dátum:</strong> {selectedOrder.date}</p>
                  <p><strong>Suma:</strong> <span className="font-bold">{formatCurrency(selectedOrder.amount)}</span></p>
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
                 <Select value={selectedOrder.status} onValueChange={(value: OrderStatus) => handleStatusChange(value)}>
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
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>Zavrieť</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
