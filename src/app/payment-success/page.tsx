import Image from "next/image"
import { redirect } from "next/navigation"
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
    <div className="flex flex-col gap-12 w-full max-w-[1366px] mx-auto h-full items-center justify-center">
      <div className="flex gap-6 justify-center ">
        {productsImages?.map(productImage => (
          <Image
            key={productImage}
            src={productImage}
            width={130}
            height={120}
            alt={productImage}
            className="bg-accent rounded-full"
          />
        ))}
      </div>
      <p className="text-2xl max-w-2xl text-center leading-10 text-">
        Uhuuul <strong className="font-semibold uppercase">{customerName}</strong>, sua compra de <strong>{productsImages?.length}</strong>
        {productsImages?.length === 1 ? ' produto' : ' produtos'} na <strong>FSW Store</strong> já esta a caminho da sua casa.
      </p>
    </div>
  )
}