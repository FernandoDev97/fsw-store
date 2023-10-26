import { Category } from "@prisma/client"
import Image from "next/image"

interface CategoryItemProps {
  category: Category
}

export const CategoryItem = ({category}: CategoryItemProps) => {

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex h-[150px] md:h-[200px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-primary to-slate-800 ">
        <Image
            src={category.imageUrl}
            width={200}
            height={200}
            sizes="100vw"
            className="w-auto object-contain h-auto"
            alt={category.name}
        />
      </div>

      <div className="bg-accent w-full text-center py-4 rounded-br-lg rounded-bl-lg">
        <p className="text-sm font-semibold">{category.name}</p>
      </div>
    </div>
  )
}
