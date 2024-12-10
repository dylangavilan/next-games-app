import { getCover } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    cover: Cover
}

const OptionImage = ({ cover }: Props) => {
  console.log(cover)
  return (
    <div className='relative lg:w-10 lg:h-10 w-8 h-8 min-w-8 lg:min-w-10'>
      <Image src={`https:${cover.url}`} 
             alt={`${cover.id} cover`} 
             className='w-full h-full top-0 left-0' 
             fill />
    </div>
  )
}

export default OptionImage