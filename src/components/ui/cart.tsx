import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import { CartItem } from "./cart-item"
import { computeProductsTotalPrice } from "@/helpers/product"
import { Separator } from "./separator"
import { ScrollArea } from "./scroll-area"
import { Button } from "./button"
import { createCheckout } from "@/actions/checkout"
import { loadStripe } from '@stripe/stripe-js'
import { signIn, useSession } from "next-auth/react"
import { createOrder } from "@/actions/order"

export const Cart = () => {
    const { data, status } = useSession()

    const { products, total, subTotal, totalDiscount } = useContext(CartContext)

    async function handleCheckoutClick() {
        if(!data?.user) {
            return
        }
      
        const { id } = await createOrder(products, (data?.user as any).id)
        const response = await createCheckout(products, id)
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
        stripe?.redirectToCheckout({
            sessionId: response.id,
        })
    }

    async function handleAutheticated () {
        await signIn("google")
    }

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
                                <CartItem key={product.id} product={computeProductsTotalPrice(product as any) as any} />
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

                    <Button onClick={status === "unauthenticated" ? handleAutheticated : handleCheckoutClick} className="uppercase font-bold mt-7">
                        Finalizar compra
                    </Button>
                </div>
            )}
        </div>
    )
}
