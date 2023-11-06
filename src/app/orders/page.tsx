import { Badge } from '@/components/ui/badge';
import { authOptions } from '@/lib/auth'
import { prismaClient } from '@/lib/prisma';
import { PackageSearchIcon } from 'lucide-react';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import { OrderItem } from './components/order-item';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const OrdersPage = async () => {
  const user = await getServerSession(authOptions)

  if (!user) {
    redirect('/')
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })

  return (
    <div className='px-5 md:px-2  max-w-[1366px] w-full mx-auto mt-8'>
      <Badge variant='outline' className="gap-1 w-fit text-base border-2 border-primary uppercase px-3 py-[0.375rem]">
        <PackageSearchIcon size={16} />
        Meus Pedidos
      </Badge>

      <div className="flex flex-col gap-5 mt-8">
        {
          orders.length > 0 ? (
            orders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))
          ) : (
            <div className="flex flex-col mt-4 items-center gap-5">
              <p className='font-semibold text-base'>
                Você ainda não tem nenhum pedido!
              </p>
              <Link href='/'>
                <Button>Ver Loja</Button>
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default OrdersPage