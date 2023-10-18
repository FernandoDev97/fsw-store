import { Product } from "@prisma/client";

interface ProductWithTotalPrice extends Product {
    totalPrice: number
}

const computeProductsTotalPrice = (product: Product): ProductWithTotalPrice => {
    if(product.discountPercentage === 0) {
        return {
            ...product,
            totalPrice: Number(product.basePrice),
        }
    }

    const totalPrice = Number(product.basePrice) * Number(product.discountPercentage / 100)

    return {
        ...product,
        totalPrice,
    }
}