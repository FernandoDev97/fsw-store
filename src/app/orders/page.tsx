import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

const OrdersPage = async () => {
  const user = await getServerSession(authOptions)

  if(!user) {
    redirect('/')
  }

  return (
    <div>OrderPage</div>
  )
}

export default OrdersPage