import React, { ComponentProps } from 'react'

export const SectionTitle = ({children, ...props}: ComponentProps<"p">) => {
  return (
    <p className="font-bold uppercase mb-3 md:text-lg" {...props}>{children}</p>
  )
}
