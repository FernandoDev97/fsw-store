import { Badge } from '@/components/ui/badge';
import { authOptions } from '@/lib/auth'
import { prismaClient } from '@/lib/prisma';
import { PackageSearchIcon } from 'lucide-react';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import { OrderItem } from './components/order-item';

const OrdersPage = async () => {
  const user = await getServerSession(authOptions)

  if(!user) {
    redirect('/')
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id
    },
    include: {
      orderProducts: true,
    }
  })

  return (
    <div className='p-5'>
       <Badge variant='outline' className="gap-1 w-fit text-base border-2 border-primary uppercase px-3 py-[0.375rem]">
        <PackageSearchIcon size={16} />
        Meus Pedidos
      </Badge>

      <div className="flex flex-col gap-5 mt-8">
      {orders.map(order => (
        <OrderItem key={order.id} order={order}/>
      ))}
      </div>
    </div>
  )
}

export default OrdersPage