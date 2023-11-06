import { Prisma } from "@prisma/client"
import Image from "next/image"

interface OrderProductItemProps {
    orderProduct: Prisma.OrderProductGetPayload<{
        include: {
            product: true
        }
    }>
}


export const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
    return (
        <div className="flex items-center gap-4">
            <div className="bg-accent rounded-lg w-[77px] h-[77px] flex items-center justify-center">
                <Image
                    src={orderProduct.product.imageUrls[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-auto max-w-[80%] max-h-[80%] object-contain"
                    alt={orderProduct.product.name}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <p className="text-xs opacity-90">Vendido e entregue por: <strong>FSW Store</strong></p>
                <p>{orderProduct.product.name}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <p className="text-base font-semibold">R$ {Number(orderProduct.basePrice).toFixed(2)}</p>
                        <p className="line-through opacity-75">R$ {Number(orderProduct.basePrice).toFixed(2)}</p>
                    </div>
                    <div className="opacity-75">
                        <p className="text-xs">Qtd: {orderProduct.quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
