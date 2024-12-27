import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string
} & PropsWithChildren

function H2({ children, className }: Props) {
  return (
    <h1 className={twMerge('text-base font-semibold', className)}>{children}</h1>
  )
}

export default H2