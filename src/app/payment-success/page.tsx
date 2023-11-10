import { authOptions } from "@/lib/auth"
import { CartContext } from "@/providers/cart"
import { CheckIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useContext, useEffect } from "react"
import Stripe from "stripe"

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const session = searchParams.session_id
  if(!session) {
    redirect('/')
  }
  const sessionId = String(searchParams.session_id)

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })
  
  const customerName = response.customer_details?.name
  const productsImages = response.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product
    return product.images[0]
  })

  return (
    <div className="grid grid-cols-2 items-stretch w-full gap-4 max-w-[1366px] mx-auto">
      <div className="w-full max-w-[700px] bg-red-300 rounded-full flex justify-center items-center">
        {productsImages && productsImages?.map(productImage => (
          <Image
            src={productImage}
            width={120} 
            height={110}
            alt={productImage}
          />
        ))}
      </div>
    </div>
  )
}