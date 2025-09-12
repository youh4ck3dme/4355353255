import { CustomerBrowser } from "@/components/customers/customer-browser";

export default function CustomersPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa zákazníkov</h1>
            <p className="text-muted-foreground mb-6">Prehľadajte, filtrujte a spravujte svojich zákazníkov.</p>
            <CustomerBrowser />
        </div>
    )
}
