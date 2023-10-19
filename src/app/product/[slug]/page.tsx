import { prismaClient } from "@/lib/prisma"
import { ProductsImage } from "./components/products-image"
import { ProductInfo } from "./components/product-info"
import { computeProductsTotalPrice } from "@/helpers/product"

interface ProductDetailsPageProps {
    params: {
        slug: string
    }
}

const ProductDetailsPage = async ({ params: { slug } }: ProductDetailsPageProps) => {
    const product = await prismaClient.product.findFirst({
        where: {
            slug,
        }
    })

    if (!product) {
        return
    }

    return (
        <div className="flex flex-col gap-8">
            <ProductsImage
                imageUrls={product.imageUrls}
                name={product.name}
            />
            <ProductInfo 
                product={computeProductsTotalPrice(product)}
            />
        </div>
    )
}

export default ProductDetailsPage