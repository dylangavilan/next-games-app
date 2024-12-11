import React from 'react'
import H2 from '../ui/h2'
import H4 from '../ui/h4'

const Summary = ({ game }: { game: GameDetail}) => {
  return (
    <div className='flex flex-col gap-4'>
      <H2>Summary</H2>
      <H4 className='text-aero-gray-400'>
        {game.summary}
      </H4>
    </div>
  )
}
export default Summary