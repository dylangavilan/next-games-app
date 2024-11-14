import React from 'react'
import H1 from '../h1'
import H3 from '../h3'
import Image from 'next/image'

type Props = {
    cover: string
    name: string
    enterprise: string
}

const Game = ({ cover, name, enterprise }: Props) => {
  return (
    <div className='flex gap-4'>
        <Image src={cover} alt={'cover ' + name} className='rounded-lg' />
        <div>
            <H1 className='text-aero-violet-600'>{name}</H1>
            <H3 className='text-aero-violet-300'>{enterprise}</H3>
        </div>

    </div>
  )
}

export default Game