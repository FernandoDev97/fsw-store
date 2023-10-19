import { prismaClient } from "@/lib/prisma"
import { ProductsImage } from "./components/products-image"

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
        <div>
            <ProductsImage
                imageUrls={product.imageUrls}
                name={product.name}
            />
        </div>
    )
}

export default ProductDetailsPage