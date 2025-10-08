import { OrderBrowser } from "@/components/orders/order-browser";
import { getOrders, getCustomersForOrders } from "./actions";

export default async function OrdersPage() {
    // These fetches can run in parallel
    const [orders, customers] = await Promise.all([
        getOrders(),
        getCustomersForOrders()
    ]);
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa objednávok</h1>
            <p className="text-muted-foreground mb-6">Prehľad a správa všetkých objednávok.</p>
            <OrderBrowser orders={orders} customers={customers} />
        </div>
    )
}
