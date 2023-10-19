import { ProductWithTotalPrice } from '@/helpers/product'
import { Badge } from '../../../../components/ui/badge'
import React from 'react'
import { ArrowDownIcon } from 'lucide-react'

interface ProductInfoProps {
    product: Pick<
        ProductWithTotalPrice,
        'basePrice'
        | 'description'
        | 'discountPercentage'
        | 'totalPrice'
        | 'name'
    >
}

export const ProductInfo = ({ product: { basePrice, description, discountPercentage, totalPrice, name } }: ProductInfoProps) => {
    return (
        <div className='flex flex-col px-5'>
            <h1 className='text-lg'>
                {name}
            </h1>

            <div className='flex items-center gap-1'>
                <h2 className='text-xl font-bold'>R$ {totalPrice.toFixed(2)}</h2>
                <Badge>
                    <ArrowDownIcon size={14} /> {discountPercentage}%
                </Badge>
            </div>

            {discountPercentage > 0 && (
                <p className='text-sm opacity-75'>
                    R$ <span className='line-through'>{basePrice.toFixed(2)}</span>
                </p>
            )}
        </div>
    )
}
