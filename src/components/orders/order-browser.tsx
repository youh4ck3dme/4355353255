'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import type { Order } from '@/app/dashboard/orders/schema';
import type { Customer } from '@/app/dashboard/customers/schema';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { startTransition } from 'react';
import { OrderTable } from './order-table';
import { Skeleton } from '../ui/skeleton';

const OrderDetailDialog = dynamic(() => import('./order-detail-dialog').then(mod => mod.OrderDetailDialog), {
    ssr: false,
    loading: () => (
        <div className="p-8 text-center">Načítavam detaily...</div>
    )
});


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
  
  const closeDialog = () => {
    setSelectedOrder(null);
  }

  return (
    <>
      <Card>
        <OrderTable orders={orders} onRowClick={handleRowClick} />
         {orders.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              Žiadne objednávky sa nenašli.
            </div>
        )}
      </Card>

      {selectedOrder && (
          <OrderDetailDialog
            isOpen={!!selectedOrder}
            closeDialog={closeDialog}
            order={selectedOrder}
            customer={customers[selectedOrder.customerId]}
          />
      )}
    </>
  );
}
