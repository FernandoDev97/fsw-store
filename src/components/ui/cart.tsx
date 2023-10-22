import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import { CartItem } from "./cart-item"
import { computeProductsTotalPrice } from "@/helpers/product"
import { Separator } from "./separator"

export const Cart = () => {
    const { products, total, subTotal, totalDiscount } = useContext(CartContext)
    return (
        <div className="flex flex-col gap-8">
            <Badge variant='outline' className="gap-1 w-fit text-base border-2 border-primary uppercase px-3 py-[0.375rem]">
                <ShoppingCartIcon size={16} />
                Catálogo
            </Badge>

            <div className="flex flex-col gap-5">
                {products.length > 0 ? (
                    products.map(product => (
                        <CartItem product={computeProductsTotalPrice(product as any) as any} />
                    ))
                ) : (
                    <p className="text-center font-semibold">
                        Carrinho vazio. Vamos fazer compras?
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-3">
                <Separator />
                <div className="flex items-center justify-between text-xs">
                    <p>Subtotal</p>
                    <p>R$ {subTotal.toFixed(2)}</p>
                </div>

                <Separator />
                <div className="flex items-center justify-between text-xs">
                    <p>Entrega</p>
                    <p>GRÁTIS</p>
                </div>

                <Separator />
                <div className="flex items-center justify-between text-xs">
                    <p>Descontos</p>
                    <p>- R$ {totalDiscount.toFixed(2)}</p>
                </div>

                <Separator />
                <div className="flex items-center justify-between text-sm font-bold">
                    <p>Total</p>
                    <p>R$ {total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}
