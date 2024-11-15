import React from 'react'
import H1 from '@/components/h1'
import H3 from '@/components/h3'
import Image from 'next/image'

type Props = {
    cover: string
    name: string
    enterprise: string
}

const Game = ({ cover, name, enterprise }: Props) => {
  return (
    <div className='flex gap-4'>
        <div className='relative lg:w-[170px] lg:h-[226px] w-32 h-[9.5rem]'>
           <Image src={cover} alt={'cover ' + name} className='rounded-lg object-cover ' fill />
        </div>
        <div>
            <H1 className='text-aero-violet-600'>{name}</H1>
            <H3 className='text-aero-violet-300'>{enterprise}</H3>
        </div>

    </div>
  )
}

export default Game