'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Prisma } from "@prisma/client"
import { format } from 'date-fns'

interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
        include: {
            orderProducts: true
        }
    }>
}

export const OrderItem = ({ order }: OrderItemProps) => {
    return (
        <Card className="px-3">
            <Accordion type="single" className="w-full" collapsible>
                <AccordionItem value={order.id}>
                    <AccordionTrigger>
                        <div className="flex flex-col gap-1 text-left">
                            Pedido com {order.orderProducts.length} {order.orderProducts.length > 1 ? "produtos" : "produto"}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div className="font-bold">
                                    <p>Status</p>
                                    {order.status === "PAYMENT_CONFIRMED" ? (
                                        <p className="text-primary">Pago</p>
                                    ) : (
                                        <p className="text-primary">Aguardando pagamento</p>
                                    )}
                                </div>

                                <div>
                                    <p className="uppercase font-semibold">Data</p>
                                    <p className="opacity-60">{format(order.createdAt, "d/MM/y")}</p>
                                </div>
                                <div>
                                    <p className="uppercase font-semibold">Pagamento</p>
                                    <p className="opacity-60">Cartão</p>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}
