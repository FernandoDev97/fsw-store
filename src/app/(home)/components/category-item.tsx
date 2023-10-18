import { Badge } from "@/components/ui/badge"
import { CATEGORY_ICON } from "@/contants/category-icons"
import { Category } from "@prisma/client"
interface CategorieItemProps {
    category: Category
}

export const CategoryItem = ({ category }: CategorieItemProps) => {

    return (
        <Badge variant="outline" className="py-3 flex justify-center items-center gap-2 rounded-lg">
            {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
            <span className="font-bold text-xs">{category.name}</span>
        </Badge>
    )
}
