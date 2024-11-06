import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    style?: string
} & PropsWithChildren

function H4({ children, style }: Props) {
  return (
    <h1 className={twMerge('text-sm md:text-base font-medium', style)}>{children}</h1>
  )
}

export default H4