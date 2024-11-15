import React from 'react'
import H1 from '@/components/h1'
import H3 from '@/components/h3'
import Image from 'next/image'
import Button from '../button'

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
      <div className='flex gap-4'>
          <div className='relative lg:w-[170px] lg:h-[226px] w-32 h-[9.5rem]'>
            <Image src={cover} alt={'cover ' + name} className='rounded-lg object-cover' fill  sizes="(max-width: 640px) 128px, (max-width: 1024px) 176px"
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