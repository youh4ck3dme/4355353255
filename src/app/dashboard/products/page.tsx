import { ProductBrowser } from "@/components/products/product-browser";

export default function ProductsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Správa produktov</h1>
            <p className="text-muted-foreground mb-6">Pridávajte, upravujte a spravujte všetky produkty vo vašom obchode.</p>
            <ProductBrowser />
        </div>
    )
}
