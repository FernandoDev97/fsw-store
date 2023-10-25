import { ProductItem } from "@/components/ui/product-item"
import { computeProductsTotalPrice } from "@/helpers/product"
import { Product } from "@prisma/client"

interface ProductListProps {
    products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => {
    return (
        <div className="flex w-full gap-4 md:gap-20 overflow-x-auto py-6 px-5 [&::-webkit-scrollbar]:hidden">
            {products.map(product => <ProductItem key={product.id} product={computeProductsTotalPrice(product)} />)}
        </div>
    )
}
