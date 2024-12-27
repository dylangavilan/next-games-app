import React from 'react'
import H2 from '../ui/h2'
import H4 from '../ui/h4'
import { parsePlatforms } from '@/app/detail/[id]/utils'


const Platforms = ({ game }: { game:GameDetail }) => {
  return (
    <div className='flex flex-col gap-4'>
        <H2>Platforms</H2>
        <H4 className='text-aero-gray-400'>
            {game.platforms ? parsePlatforms(game.platforms) : 'Not yet available'}
        </H4>
    </div>
  )
}
export default Platforms