import { OrderBrowser } from "@/components/orders/order-browser";
import { getOrders, getCustomersForOrders } from "./actions";

export default async function OrdersPage() {
    const orders = await getOrders();
    const customers = await getCustomersForOrders();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa objednávok</h1>
            <p className="text-muted-foreground mb-6">Prehľad a správa všetkých objednávok.</p>
            <OrderBrowser orders={orders} customers={customers} />
        </div>
    )
}
