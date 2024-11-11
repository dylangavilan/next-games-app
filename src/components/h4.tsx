import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string
} & PropsWithChildren

function H4({ children, className }: Props) {
  return (
    <h1 className={twMerge('text-sm md:text-base font-medium', className)}>{children}</h1>
  )
}

export default H4