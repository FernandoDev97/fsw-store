import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import { CartItem } from "./cart-item"
import { computeProductsTotalPrice } from "@/helpers/product"
import { Separator } from "./separator"
import { ScrollArea } from "./scroll-area"
import { Button } from "./button"

export const Cart = () => {
    const { products, total, subTotal, totalDiscount } = useContext(CartContext)
    return (
        <div className="flex flex-col gap-8 h-full">
            <Badge variant='outline' className="gap-1 w-fit text-sm border-2 border-primary uppercase px-3 py-[0.375rem]">
                <ShoppingCartIcon size={16} />
                Carrinho de compras
            </Badge>

            <div className="flex flex-col gap-5 hfull max-h-full overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex flex-col gap-8 h-full">
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
                </ScrollArea>
            </div>
            {products.length > 0 && (
                <div className="flex flex-col gap-3 mt-auto">
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
                    <div className="flex items-center justify-between text-sm font-bold uppercase">
                        <p>Total</p>
                        <p>R$ {total.toFixed(2)}</p>
                    </div>

                    <Button className="uppercase font-bold mt-7">
                        Finalizar compra
                    </Button>
                </div>
            )}
        </div>
    )
}
