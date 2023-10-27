'use client'
import { ProductWithTotalPrice } from '@/helpers/product'
import { Badge } from '../../../../components/ui/badge'
import React, { useContext, useState } from 'react'
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/providers/cart'

interface ProductInfoProps {
    // product: Pick<
    //     ProductWithTotalPrice,
    //     'basePrice'
    //     | 'description'
    //     | 'discountPercentage'
    //     | 'totalPrice'
    //     | 'name'
    // >
    product: ProductWithTotalPrice
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const [quantity, setQuantity] = useState(1)
    const { addProductsToCart } = useContext(CartContext)

    const handleDecreaseQuantityCLick = () => {
        setQuantity(state => state === 1 ? state : state - 1)
    } 

    const handleIncreaseQuantityCLick = () => {
        setQuantity(state => state + 1)
    } 

    return (
        <div className='flex flex-col mt-8 lg:mt-0 px-5 lg:w-full lg:max-w-[35%] lg:bg-accent rounded-lg lg:justify-center'>
            <h1 className='text-lg'>
                {product.name}
            </h1>

            <div className='flex items-center gap-1 lg:mt-2'>
                <h2 className='text-xl font-bold'>R$ {product.totalPrice.toFixed(2)}</h2>
                <Badge>
                    <ArrowDownIcon size={14} /> {product.discountPercentage}%
                </Badge>
            </div>

            {product.discountPercentage > 0 && (
                <p className='text-sm opacity-75'>
                    R$ <span className='line-through'>{Number(product.basePrice).toFixed(2)}</span>
                </p>
            )}

            <div className='flex items-center gap-2 mt-4'>
                <Button onClick={handleDecreaseQuantityCLick} size='icon' variant='outline'>
                    <ArrowLeftIcon size={16}/>
                </Button>

                <span>{quantity}</span>

                <Button onClick={handleIncreaseQuantityCLick} size='icon' variant='outline'>
                    <ArrowRightIcon size={16}/>
                </Button>
            </div>

            <div className='flex flex-col gap-3 mt-8'>
                <h3 className='font-bold'>
                    Descrição
                </h3>
                <p className='text-sm opacity-60 text-justify'>{product.description}</p>
            </div>

            <Button onClick={() => addProductsToCart({...product, quantity})} className='uppercase font-bold mt-8'>
                Adicionar ao carrinho
            </Button>

            <div className='bg-accent flex items-center mt-5 px-5 py-2 justify-between lg:bg-[#2a2a2a] lg:rounded-lg lg:mt-8'>
                <div className='flex items-center gap-2'>
                    <TruckIcon/>
                    <div className='flex flex-col '>
                        <p className='text-xs'>Entrega via <span className='font-bold'>FSPacket®</span></p>
                        <p className='text-xs text-violet-700'>Envio para <span className='font-bold'>todo Brasil</span></p>
                    </div>
                </div>
                <p className='text-xs font-bold'>Frete grátis</p>
            </div>
        </div>
    )
}
