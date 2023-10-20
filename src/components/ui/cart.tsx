import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import { CartItem } from "./cart-item"
import { computeProductsTotalPrice } from "@/helpers/product"

export const Cart = () => {
    const { products } = useContext(CartContext)
    return (
        <div className="flex flex-col gap-8">
            <Badge variant='outline' className="gap-1 w-fit text-base border-2 border-primary uppercase px-3 py-[0.375rem]">
                <ShoppingCartIcon size={16} />
                Catálogo
            </Badge>

            <div className="flex flex-col gap-5">
                {products.map(product => (
                    <CartItem product={computeProductsTotalPrice(product as any) as any} />
                ))}
            </div>
        </div>
    )
}
