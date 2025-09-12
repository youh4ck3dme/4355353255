'use client';

import * as React from 'react';
import type { Customer } from '@/app/dashboard/customers/schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { CustomerTable } from './customer-table';


export function CustomerBrowser({ customers: initialCustomers }: { customers: Customer[]}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = React.useState(searchParams.get('q') || '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set('q', debouncedSearchTerm);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, router, searchParams]);

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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <CustomerTable customers={initialCustomers} />
       {initialCustomers.length === 0 && (
          <CardContent>
            <div className="text-center p-8 text-muted-foreground">
              Žiadni zákazníci sa nenašli.
            </div>
          </CardContent>
        )}
    </Card>
  );
}
