import { Badge } from "@/components/ui/badge"
import { ShapesIcon } from "lucide-react"
import { CategoryItem } from "./components/category-item"
import { prismaClient } from "@/lib/prisma"

const CatalogPage = async () => {

  const categories = await prismaClient.category.findMany({})

  return (
    <div className="p-5 flex flex-col gap-12">
      <Badge variant='outline' className="gap-1 w-fit text-base border-2 border-primary uppercase px-3 py-[0.375rem]">
        <ShapesIcon size={16} />
        Catálogo
      </Badge>
      <div className="grid grid-cols-2 gap-8 mt-auto">
        {categories.map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>

    </div>
  )
}

export default CatalogPage