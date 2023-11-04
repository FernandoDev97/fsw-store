import { Prisma } from "@prisma/client"
import Image from "next/image"

interface OrderProductItemProps {
    orderProduct: Prisma.OrderProductGetPayload<{
        include: {
            product: true
        }
    }>
}


export const OrderProductItem = ({orderProduct}: OrderProductItemProps) => {
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
        <div className="flex flex-col">

        </div>
    </div>
  )
}
