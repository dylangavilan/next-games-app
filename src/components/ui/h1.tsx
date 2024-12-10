import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string
} & PropsWithChildren

function H1({ children, className }: Props) {
  return (
    <h1 className={twMerge('md:text-2xl text-xl font-semibold', className)}>{children}</h1>
  )
}

export default H1