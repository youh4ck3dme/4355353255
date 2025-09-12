'use client';

import * as React from 'react';
import { customers as initialCustomers } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

export function CustomerBrowser() {
  const [customers, setCustomers] = React.useState(initialCustomers);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredCustomers = initialCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term)
    );
    setCustomers(filteredCustomers);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  return (
    <Card>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Hľadať zákazníka podľa mena alebo emailu..."
            className="pl-8 w-full md:w-1/3"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
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
       {customers.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            Žiadni zákazníci sa nenašli.
          </div>
        )}
    </Card>
  );
}
