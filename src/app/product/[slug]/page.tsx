import { prismaClient } from "@/lib/prisma"

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
        <div>{product.name}</div>
    )
}

export default ProductDetailsPage