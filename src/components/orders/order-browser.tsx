'use client';

import * as React from 'react';
import { orders as initialOrders, customers } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';


type Order = typeof initialOrders[0];

const getStatusVariant = (status: string): VariantProps<typeof badgeVariants>['variant'] => {
    switch (status) {
        case 'Spracováva sa': return 'secondary';
        case 'Odoslaná': return 'default';
        case 'Doručená': return 'outline';
        case 'Zrušená': return 'destructive';
        default: return 'secondary';
    }
}

export function OrderBrowser() {
  const [orders, setOrders] = React.useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedOrder) {
      // Update local state
      const updatedOrders = orders.map(o => 
        o.id === selectedOrder.id ? { ...o, status: newStatus } : o
      );
      setOrders(updatedOrders);

      // Also update the selected order in the dialog
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
  }
  
  const customerDetails = customers.find(c => c.name === selectedOrder?.customerName);

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Objednávky</TableHead>
              <TableHead>Zákazník</TableHead>
              <TableHead>Dátum</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Suma</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} onClick={() => handleRowClick(order)} className="cursor-pointer">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(order.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
                 <Select value={selectedOrder.status} onValueChange={handleStatusChange}>
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
