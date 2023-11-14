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
  if (!session) {
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
      {productsImages && productsImages?.map(productImage => (
        <div key={productImage} className="bg-red-300 rounded-full flex justify-center items-center">
          <Image
            src={productImage}
            width={120}
            height={110}
            alt={productImage}
          />
        </div>
      ))}

      <p>
        Uhuuul <strong>{customerName}</strong>, sua compra de <strong>{productsImages?.length}</strong>
        {productsImages?.length === 1 ? ' camiseta' : ' camisetas'} já esta a caminho da sua casa.
      </p>
    </div>
  )
}