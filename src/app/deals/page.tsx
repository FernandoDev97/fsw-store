import { Badge } from '@/components/ui/badge'
import { ProductItem } from '@/components/ui/product-item'
import { computeProductsTotalPrice } from '@/helpers/product'
import { prismaClient } from '@/lib/prisma'
import { PercentIcon } from 'lucide-react'
import React from 'react'

const Deals = async () => {
    const deals = await prismaClient.product.findMany({
        where: {
          discountPercentage: {
            gt: 0
          }
        }
      })
  return (
    <div className="py-5 px-5 md:px-3 flex flex-col gap-12 w-full max-w-[1366px] mx-auto">
      <Badge variant='outline' className="gap-1 w-fit text-base border-2 border-primary uppercase px-3 py-[0.375rem]">
        <PercentIcon size={16}/>
        Ofertas
      </Badge>

      <div className="grid grid-cols-2 md:flex flex-wrap gap-y-6 gap-x-4 place-items-center justify-center">
        {deals.map(product => (
          <ProductItem key={product.id} product={computeProductsTotalPrice(product)} />
        ))}
      </div>
    </div>
  )
}

export default Deals