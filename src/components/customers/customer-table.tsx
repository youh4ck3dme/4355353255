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
    <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meno</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Dátum registrácie</TableHead>
              <TableHead className="text-right">Počet objednávok</TableHead>
              <TableHead className="text-right">Celková útrata</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{customer.email}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.registrationDate}</TableCell>
                <TableCell className="text-right">{customer.totalOrders}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
