import { OrderBrowser } from "@/components/orders/order-browser";

export default function OrdersPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa objednávok</h1>
            <p className="text-muted-foreground mb-6">Prehľad a správa všetkých objednávok.</p>
            <OrderBrowser />
        </div>
    )
}
