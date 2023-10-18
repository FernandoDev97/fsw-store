import { prismaClient } from '@/lib/prisma'
import React from 'react'
import { CategoryItem } from './category-item'
import Link from 'next/link'

export const Categories = async () => {
    const categories = await prismaClient.category.findMany({})

    return (
        <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            {categories.map(category => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                    <CategoryItem category={category}/> 
                </Link>
            ))}
        </div>
    )
}
