import type { Customer } from '@/app/dashboard/customers/schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function CustomerTable({ customers }: { customers: Customer[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Meno</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Dátum registrácie</TableHead>
          <TableHead className="text-right">Počet objednávok</TableHead>
          <TableHead className="text-right">Celková útrata</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.registrationDate}</TableCell>
            <TableCell className="text-right">{customer.totalOrders}</TableCell>
            <TableCell className="text-right font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
