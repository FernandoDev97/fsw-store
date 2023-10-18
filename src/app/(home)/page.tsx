import Image from "next/image"
import { Categories } from "./components/categories"
import { ProductList } from "./components/product-list"
import { prismaClient } from "@/lib/prisma"

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })

  return (
    <div>
      <Image
        className="h-auto w-full px-5"
        src="/Banner.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="Até 5% de desconto este mês"
      />

      <div className="mt-8">
        <Categories />
      </div>

      <div className="mt-8">
        <ProductList products={deals}/>
      </div>
    </div>
  )
}
