'use client'

import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Order, Prisma } from "@prisma/client"


interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
        include: {
            orderProducts: true
        }
    }>
}

export const OrderItem = ({ order }: OrderItemProps) => {
    return (
        <Card>
            <Accordion type="single" className="w-full">
                <AccordionItem value={order.id}>
                    <AccordionTrigger>
                        <div className="flex flex-col gap-1 text-left">
                            Pedido com {order.orderProducts.length}
                        </div>
                    </AccordionTrigger>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}
