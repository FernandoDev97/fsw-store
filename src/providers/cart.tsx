'use client'

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
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
    addProductsToCart: () => { },
})

const CartProvider = ({ children }: CartProviderProps) => {
    const [products, setProducts] = useState<CartProduct[]>([])

    const addProductsToCart = (product: CartProduct) => {

        const productIsAlreadyOnCart = products.findIndex(cartProduct => cartProduct.id === product.id)

        if (productIsAlreadyOnCart < 0) {
            setProducts(state => [...state, product])
        } else {
            setProducts(state => state.map(cartProduct => {
                if (cartProduct.id === product.id) {
                    return {
                        ...cartProduct,
                        quantity: product.quantity + cartProduct.quantity 
                    }
                }
                return cartProduct
            }))
        }
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