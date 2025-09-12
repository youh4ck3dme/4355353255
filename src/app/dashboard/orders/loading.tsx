import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function OrdersLoading() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa objednávok</h1>
            <p className="text-muted-foreground mb-6">Prehľad a správa všetkých objednávok.</p>
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
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i} className="h-[65px]">
                                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-[100px] rounded-full" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-4 w-[70px] ml-auto" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
