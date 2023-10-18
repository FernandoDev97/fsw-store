import { Product } from "@prisma/client"
import Image from "next/image"

interface ProductItemProps {
    product: Product
}

export const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <div className="flex flex-col max-w-[156px] gap gap-4">
            <div className="bg-accent rounded-lg h-[170px] w-[156px] flex justify-center items-center">
                <Image
                    src={product.imageUrls[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="max-h-[70%] w-auto object-contain max-w-[80%] h-auto"
                    alt={product.name}
                />
            </div>
            <div>
                <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                    {product.name}
                </p>
            </div>
        </div>
    )
}
