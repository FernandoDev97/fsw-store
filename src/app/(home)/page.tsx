import { Categories } from "./components/categories"
import { ProductList } from "../../components/ui/product-list"
import { prismaClient } from "@/lib/prisma"
import { SectionTitle } from "./components/section-title"
import { PromoBanner } from "./components/promo-banner"

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      }
    }
  })

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      }
    }
  })

  return (
    <div className="py-8">
      <PromoBanner
        src="/Banner.png"
        alt="Até 55% de desconto este mês"
      />

      <div className="mt-8">
        <Categories />
      </div>

      <div className="mt-8">
        <SectionTitle>
          Ofertas
        </SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src='/banner-mouses.png'
        alt="Até 55% de desconto em mouses"
      />

      <div className="mt-8">
        <SectionTitle>
          Teclados
        </SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src='/banner-fones.png'
        alt="Até 20% de desconto em Fones"
      />

      <div className="mt-8">
        <SectionTitle>
          Mouses
        </SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}
