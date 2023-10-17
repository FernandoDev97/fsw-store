'use client'

import Image from "next/image"

export default function Home() {
  return (
    <div className="p-5">
      <Image
        className="h-auto w-full" 
        src="/Banner.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="Até 5% de desconto este mês"
      />
    </div>
  )
}
