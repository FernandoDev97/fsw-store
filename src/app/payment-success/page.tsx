
import { prismaClient } from "@/lib/prisma"
import { CartContext } from "@/providers/cart"
import { CheckIcon } from "lucide-react"
import { useContext, useEffect } from "react"

const PaymentSuccess = async () => {

  return (
    <div className="w-full h-full flex justify-center mt-8">
        <CheckIcon size={200} className="text-emerald-500"/>
        <h1></h1>
    </div>
  )
}
export default PaymentSuccess