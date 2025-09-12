import { CustomerBrowser } from "@/components/customers/customer-browser";
import { getCustomers } from "./actions";

export default async function CustomersPage({
    searchParams
}: {
    searchParams?: { q?: string; }
}) {
    const query = searchParams?.q || '';
    const customers = await getCustomers(query);
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa zákazníkov</h1>
            <p className="text-muted-foreground mb-6">Prehľadajte, filtrujte a spravujte svojich zákazníkov.</p>
            <CustomerBrowser customers={customers} />
        </div>
    )
}
