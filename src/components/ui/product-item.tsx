import { ProductWithTotalPrice } from "@/helpers/product"
import Image from "next/image"
import { Badge } from "./badge"
import { ArrowDownIcon } from "lucide-react"
import Link from "next/link"

interface ProductItemProps {
    product: ProductWithTotalPrice
}

export const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <div title={product.discountPercentage > 0 ? `De R$ ${Number(product.basePrice).toFixed(2)} por R$ ${product.totalPrice.toFixed(2)}` : `R$ ${Number(product.basePrice).toFixed(2)}`} className="flex flex-col cursor-pointer max-w-[170px] md:w-full md:max-w-full gap-4 cursor-default">
                <div className="bg-accent relative rounded-lg h-[170px] md:h-[200px] w-[170px] md:w-[200px] flex justify-center items-center">
                    <Image
                        src={product.imageUrls[0]}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="max-h-[70%] w-auto object-contain max-w-[80%] h-auto"
                        alt={product.name}
                    />
                    {product.discountPercentage > 0 && (
                        <Badge className="absolute left-3 top-3 px-2 py-[2px]">
                            <ArrowDownIcon size={14} /> {product.discountPercentage}%
                        </Badge>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                        {product.name}
                    </p>
                    <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
                        {product.discountPercentage > 0 ? (
                            <>
                                <p className="font-semibold text-base">R$ {product.totalPrice.toFixed(2)}</p>
                                <p className="opacity-75 text-xs line-through">R$ {Number(product.basePrice).toFixed(2)}</p>
                            </>
                        ) : (
                            <p className="font-semibold text-base">R$ {Number(product.basePrice).toFixed(2)}</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
