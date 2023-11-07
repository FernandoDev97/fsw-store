import { authOptions } from "@/lib/auth"
import { CartContext } from "@/providers/cart"
import { CheckIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { useContext, useEffect } from "react"

const PaymentSuccess = async () => {
  const user = await getServerSession(authOptions)
  // const {cleanCart} = useContext(CartContext)

  if (!user) {
    redirect('/')
  }

  // useEffect(() => {
  //   cleanCart()
  // }, [])

  return (
    <div className="w-full h-full flex mt-8 flex-col items-center">
        <CheckIcon size={200} className="text-emerald-500"/>
        <h1>Seus pedido(s) foram pagos com sucesso!</h1>
    </div>
  )
}
export default PaymentSuccess