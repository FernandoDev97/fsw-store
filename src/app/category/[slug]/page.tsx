import { Badge } from "@/components/ui/badge"
import { ProductItem } from "@/components/ui/product-item"
import { CATEGORY_ICON } from "@/contants/category-icons"
import { computeProductsTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"

const CategoryProducts = async ({ params }: any) => {

  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug
    },
    include: {
      Product: true
    }
  })

  return (
    <div className="py-5 px-5 md:px-3 flex flex-col gap-12 w-full max-w-[1366px] mx-auto">
      <Badge variant='outline' className="gap-1 w-fit text-base border-2 border-primary uppercase px-3 py-[0.375rem]">
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {params.slug}
      </Badge>

      <div className="grid grid-cols-2 md:flex flex-wrap gap-y-6 gap-x-4 place-items-center">
        {category?.Product.map(product => (
          <ProductItem key={product.id} product={computeProductsTotalPrice(product)} />
        ))}
      </div>
    </div>
  )
}

export default CategoryProducts