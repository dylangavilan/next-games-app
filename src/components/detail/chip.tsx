import React from 'react'
import { Calendar, Puzzle, Star } from 'lucide-react';
type Props = {
    type: 'genre' | 'release' | 'rating'
    value: string
}

const Chip = ({ type, value }: Props) => {
  const variants: { [key in Props['type']]: JSX.Element } = {
      genre: <Star />,
      release: <Puzzle />,
      rating: <Calendar />
  };

  return (
    <div>
        {variants[type]}
        {type}
    </div>
  )
}

export default Chip