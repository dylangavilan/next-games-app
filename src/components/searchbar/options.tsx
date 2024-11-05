'use client'
import React, { PropsWithChildren } from 'react'

type Props = {
    optionsLength: number;
} & PropsWithChildren

const Select = ({ optionsLength = 0, children }: Props) => {
  return (
    <ul className={`absolute w-full rounded-b-[20px] bg-white border px-2 py-1.5 
                  border-aera-pink-600 overflow-y-auto shadow-lg max-h-60 ${optionsLength === 0 && 'hidden'}`}>
        {children}
    </ul>
  )
}

export default Select