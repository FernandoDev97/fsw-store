'use client'

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends Product {
    quantity: number
}

interface ICartContext {
    products: CartProduct[]
    cartTotalPrice: number
    cartBasePrice: number
    cartTotalDiscount: number
    addProductsToCart: (product: CartProduct) => void
}

interface CartProviderProps {
    children: ReactNode
    
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartBasePrice: 0,
    cartTotalPrice: 0,
    cartTotalDiscount: 0,
    addProductsToCart: () => {},
})

const CartProvider = ({ children }: CartProviderProps) => {
    const [products, setProducts] = useState<CartProduct[]>([])

    const addProductsToCart = (product: CartProduct) => {
        setProducts(state => [...state, product])
    }
    return (
        <CartContext.Provider value={{
            products,
            addProductsToCart,
            cartBasePrice: 0,
            cartTotalPrice: 0,
            cartTotalDiscount: 0
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider