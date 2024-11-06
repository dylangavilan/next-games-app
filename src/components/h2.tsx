import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    style?: string
} & PropsWithChildren

function H2({ children, style }: Props) {
  return (
    <h1 className={twMerge('text-base font-semibold', style)}>{children}</h1>
  )
}

export default H2