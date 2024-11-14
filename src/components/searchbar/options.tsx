import React, { PropsWithChildren } from 'react'
import SelectItem from './option-item';

type Props = {
    options: Array<any> | null;
    isLoading: boolean;
} & PropsWithChildren

const Select = ({ options, children, isLoading }: Props) => {
  return (
    <ul className={`absolute w-full rounded-b-[20px] bg-white border px-2 py-1.5 
                  border-aera-pink-600 overflow-y-auto shadow-lg max-h-60 ${!options && !isLoading && 'hidden'}`}>
        {children}
    </ul>
  )
}

Select.Item = SelectItem
export default Select