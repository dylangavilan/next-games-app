import Link from 'next/link';
import React, { PropsWithChildren } from 'react'

type Props = {
    handleSelect?: () => void;
} & PropsWithChildren;

const SelectItem = ({ children, handleSelect }: Props) => {
  return (
    <li onClick={handleSelect} className='py-1.5 px-2 rounded-[6px] cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-sm'>
        {children}
    </li>
  )
}

export default SelectItem