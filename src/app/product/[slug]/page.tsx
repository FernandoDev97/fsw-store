import { prismaClient } from "@/lib/prisma"
import { ProductsImage } from "./components/products-image"
import { ProductInfo } from "./components/product-info"
import { computeProductsTotalPrice } from "@/helpers/product"
import { ProductList } from "@/components/ui/product-list"
interface ProductDetailsPageProps {
    params: {
        slug: string
    }
}

const ProductDetailsPage = async ({ params: { slug } }: ProductDetailsPageProps) => {
    const product = await prismaClient.product.findFirst({
        where: {
            slug,
        },
        include: {
            category: {
                include: {
                    Product: {
                        where: {
                            slug: {
                                not: slug
                            }
                        }
                    }
                }
            }
        }
    })


    if (!product) {
        return
    }

    return (
        <div className="flex flex-col gap-8 pb-8">
            <ProductsImage
                imageUrls={product.imageUrls}
                name={product.name}
            />
            <ProductInfo
                product={computeProductsTotalPrice(product)}
            />
            <div className="flex flex-col gap-3">
                <h3 className="uppercase font-bold p-5">Produtos relacionados</h3>
                <ProductList products={product.category.Product} />
            </div>
        </div>
    )
}

export default ProductDetailsPage