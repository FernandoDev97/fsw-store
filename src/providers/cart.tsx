'use client'

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useDeferredValue, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
    quantity: number
}

interface ICartContext {
    products: CartProduct[]
    cartTotalPrice: number
    cartBasePrice: number
    cartTotalDiscount: number
    subTotal: number
    total: number
    totalDiscount: number
    addProductsToCart: (product: CartProduct) => void
    changeCartProductQuantity: (productId: string, type: 'increase' | 'decrease') => void
    removeProductCart: (pruduct: string) => void
    cleanCart: () => void
}

interface CartProviderProps {
    children: ReactNode

}

const PRODUCTS_LOCAL_STORAGE = "@fsw-store/cart-products"

export const CartContext = createContext<ICartContext>({} as ICartContext)

const CartProvider = ({ children }: CartProviderProps) => {
    const [products, setProducts] = useState<CartProduct[]>(() => {
        if (typeof window !== 'undefined') {
            const storedCartItems = localStorage.getItem(PRODUCTS_LOCAL_STORAGE)
            if (storedCartItems) {
                return JSON.parse(storedCartItems)
            }
        }
        return [];
    }
    )

    useEffect(() => {
        localStorage.setItem(PRODUCTS_LOCAL_STORAGE, JSON.stringify(products))
    }, [products])

    // Valor total sem descontos
    const subTotal = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + Number(product.basePrice) * product.quantity
        }, 0)
    }, [products])

    // Valor total com descontos
    const total = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + product.totalPrice * product.quantity
        }, 0)
    }, [products])

    const totalDiscount = subTotal - total

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

    function changeCartProductQuantity(productId: string, type: 'increase' | 'decrease') {
        const productIsAlreadyOnCart = products.findIndex(cartProduct => cartProduct.id === productId)

        if (productIsAlreadyOnCart >= 0) {
            setProducts(state => state.map(cartProduct => {
                if (cartProduct.id === productId) {
                    return {
                        ...cartProduct,
                        quantity: type === 'increase' ? cartProduct.quantity + 1 : cartProduct.quantity - 1
                    }
                }
                return cartProduct
            })
                .filter(productCart => productCart.quantity > 0)
            )
        }
    }

    function removeProductCart(productId: string) {
        setProducts(state => state.filter(cartProduct => cartProduct.id !== productId))
    }

    function cleanCart() {
        setProducts([])
    }

    return (
        <CartContext.Provider value={{
            products,
            addProductsToCart,
            changeCartProductQuantity,
            removeProductCart,
            cleanCart,
            subTotal,
            total,
            totalDiscount,
            cartBasePrice: 0,
            cartTotalPrice: 0,
            cartTotalDiscount: 0
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider