import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"

export const Cart = () => {
    const { products } = useContext(CartContext)
    return (
        <div>
            <Badge variant='outline' className="gap-1 w-fit text-base border-2 border-primary uppercase px-3 py-[0.375rem]">
                <ShoppingCartIcon size={16} />
                Catálogo
            </Badge>

            {products.map(product => (
                <h1 key={product.id}>{product.name}</h1>
            ))}
        </div>
    )
}
