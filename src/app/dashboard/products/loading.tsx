import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function ProductsLoading() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa produktov</h1>
            <p className="text-muted-foreground mb-6">Pridávajte, upravujte a spravujte všetky produkty vo vašom obchode.</p>
            <Card>
                <div className="flex items-center gap-4 p-4 border-b">
                    <Skeleton className="h-9 w-[150px]" />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]"><Skeleton className="h-4 w-4" /></TableHead>
                            <TableHead className="w-[80px]">Obrázok</TableHead>
                            <TableHead>Názov</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Na sklade</TableHead>
                            <TableHead className="text-right">Cena</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                <TableCell><Skeleton className="h-10 w-10 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-[80px] rounded-full" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-4 w-[40px] ml-auto" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-4 w-[60px] ml-auto" /></TableCell>
                                <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
