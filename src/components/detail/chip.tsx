import React from 'react'
import { Calendar, Puzzle, Star } from 'lucide-react';
type Props = {
  type: Chip
  value: string | number
}

const Chip = ({ type, value }: Props) => {
  const variants: { [key in Props['type']]: JSX.Element } = {
      genre: <Puzzle />,
      release: <Calendar />,
      rating: <Star />
  };

  return (
    <p className='flex items-center py-2 px-3 gap-1 capitalize font-medium border rounded-[100px] border-aera-gray-200'>
        <span className='flex gap-2 text-aera-violet-600 text-base items-center'>{variants[type]} {type}:{"  "} </span>
        <span className='text-aera-violet-900 text-base'>{value}</span>
    </p> 
  )
}

export default Chip