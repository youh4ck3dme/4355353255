import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Search } from 'lucide-react';

export default function CustomersLoading() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa zákazníkov</h1>
            <p className="text-muted-foreground mb-6">Prehľadajte, filtrujte a spravujte svojich zákazníkov.</p>
            <Card>
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-10 pl-8 w-full md:w-1/3" />
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
                        {Array.from({ length: 5 }).map((_, i) => (
                             <TableRow key={i} className="h-[65px]">
                                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-4 w-[80px] ml-auto" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
