'use client'

import { CartContext, CartProduct } from '@/providers/cart'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Button } from './button'
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from 'lucide-react'

interface CartItemPros {
    product: CartProduct
}

export const CartItem = ({ product }: CartItemPros) => {

    const { changeCartProductQuantity } = useContext(CartContext)

    function handleIncreaseClick () {
        changeCartProductQuantity(product.id, 'increase')
      }
    
      function handleDecreaseClick () {
        changeCartProductQuantity(product.id, 'decrease')
      }

    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <div className='bg-accent flex items-center w-[77px] h-[77px] justify-center rounded-lg'>
                    <Image
                        src={product.imageUrls[0]}
                        height={0}
                        width={0}
                        alt={product.name}
                        sizes="100vw"
                        className="max-h-[70%] w-auto object-contain max-w-[80%] h-auto"
                    />
                </div>

                <div className='flex flex-col'>
                    <p className='text-xs'>{product.name}</p>
                    <div className="flex items-center gap-2">
                        <p className='font-bold text-sm'>R$ {product.totalPrice.toFixed(2)}</p>
                        {product.discountPercentage > 0 && (
                            <p className='opacity-75 line-through text-xs'>R$ {Number(product.basePrice).toFixed(2)}</p>
                        )}
                    </div>

                    <div className='flex items-center gap-1'>
                        <Button onClick={handleDecreaseClick} size='icon' variant='outline'>
                            <ArrowLeftIcon size={16} />
                        </Button>

                        <span className='text-xs'>{product.quantity}</span>

                        <Button onClick={handleIncreaseClick} size='icon' variant='outline'>
                            <ArrowRightIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>
            <Button size='icon' variant='outline'>
                <TrashIcon size={16}/>
            </Button>
        </div>
    )
}
