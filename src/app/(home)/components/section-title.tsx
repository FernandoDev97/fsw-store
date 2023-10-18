import React, { ComponentProps } from 'react'

export const SectionTitle = ({children, ...props}: ComponentProps<"p">) => {
  return (
    <p className="font-bold uppercase pl-5 mb-3" {...props}>{children}</p>
  )
}
