import React from 'react'
import H1 from '@/components/ui/h1'
import H3 from '@/components/ui/h3'
import Image from 'next/image'
import Button from '@/components/ui/button'

type Props = {
    cover: string
    name: string
    company: string
    url?: string
    handleCollect: () => void
    isCollected: boolean
}

const Game = ({ cover, name, company, handleCollect, isCollected }: Props) => {
  
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 '> 
          <div className='relative w-[110.5px] h-[110px] lg:w-[170px] lg:h-[226px]'>
            <Image src={cover}
                   alt="game-cover"
                   fill
                   className="w-full h-full top-0 left-0  rounded"
            />
          </div>
          <div className='flex flex-col gap-6'>
              <div>
                <H1 className='text-aero-violet-600'>{name}</H1>
                <H3 className='text-aero-violet-300'>{company}</H3>
              </div>
              <Button variant={!isCollected ? 'primary' : 'secondary'} onClick={handleCollect} className='hidden lg:block'>
                {!isCollected ? 'Collect game' : 'Game collected'}
              </Button>        
          </div>
      </div>
      <Button variant={!isCollected ? 'primary' : 'secondary'} onClick={handleCollect} className='lg:hidden block'>
          {!isCollected ? 'Collect game' : 'Game collected'}
      </Button>   
    </div>
  )
}

export default Game