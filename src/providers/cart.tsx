'use client'

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

interface CartProduct extends Product {
    quantity: number
}

interface ICartContext {
    products: CartProduct[]
    cartTotalPrice: number
    cartBasePrice: number
    cartTotalDiscount: number
}

interface CartProviderProps {
    children: ReactNode
}

const CartContext = createContext<ICartContext>({
    products: [],
    cartBasePrice: 0,
    cartTotalPrice: 0,
    cartTotalDiscount: 0
})

const CartProvider = ({ children }: CartProviderProps) => {
    return (
        <CartContext.Provider value={{
            products: [],
            cartBasePrice: 0,
            cartTotalPrice: 0,
            cartTotalDiscount: 0
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider