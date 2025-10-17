import type { Order, OrderStatus } from '@/app/dashboard/orders/schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge, badgeVariants } from '@/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';

const getStatusVariant = (status: OrderStatus): VariantProps<typeof badgeVariants>['variant'] => {
    switch (status) {
        case 'Spracováva sa': return 'secondary';
        case 'Odoslaná': return 'default';
        case 'Doručená': return 'outline';
        case 'Zrušená': return 'destructive';
        default: return 'secondary';
    }
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
}

interface OrderTableProps {
    orders: Order[];
    onRowClick: (order: Order) => void;
}

export function OrderTable({ orders, onRowClick }: OrderTableProps) {
  return (
    <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Objednávky</TableHead>
              <TableHead>Zákazník</TableHead>
              <TableHead className="hidden md:table-cell">Dátum</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Suma</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} onClick={() => onRowClick(order)} className="cursor-pointer">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(order.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
