import React from 'react'
import { Calendar, Puzzle, Star } from 'lucide-react';
import { getDate, parseGenres } from '@/app/detail/[id]/utils';
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
    <p className='flex items-center py-2 px-3 gap-1 capitalize font-medium border-2 rounded-[100px] border-aero-violet-50'>
        <span className='flex gap-2 text-aero-violet-600 text-base items-center'>{variants[type]} {type}:{"  "} </span>
        <span className='text-aero-violet-900 text-base'>{value}</span>
    </p> 
  )
}

const Chips = ({ game }: { game: GameDetail }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      <Chip type='rating' value={game?.rating?.toFixed(1) ?? 'None'} />
      <Chip type='release' value={game.first_release_date ? getDate(game.first_release_date) : 'Not available'} />
      <Chip type='genre' value={parseGenres(game.genres)} />
    </div>
  )
}
export default Chips