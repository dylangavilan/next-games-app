import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string
} & PropsWithChildren

function H3({ children, className }: Props) {
  return (
    <h1 className={twMerge('text-sm font-medium', className)}>{children}</h1>
  )
}

export default H3