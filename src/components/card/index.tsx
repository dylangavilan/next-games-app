import { getCover } from '@/lib/utils'
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Props = {
  handleRemove: () => void
  onClick: () => void
} & Game

export default function Card({ cover, name, onClick, handleRemove }: Props) {
  const coverImg = cover?.image_id ?? 'nocover'
  return (
    <div className={"relative sm:w-36 sm:h-48 lg:w-44 lg:h-56 w-28 h-40 cursor-pointer"} onClick={onClick}>
        <Image
          src={getCover('cover_big', coverImg)}
          alt={name}
          fill
          className="w-full h-full top-0 left-0 object-cover rounded-2xl"
        /> 
      <div className="absolute top-0 left-0 w-full h-full rounded-lg">
        <button 
          className="absolute bottom-2 right-2 z-20 rounded-full w-10 h-10 bg-aero-gray-0 flex items-center justify-center" 
          onClick={(e) => {
            e.stopPropagation(); 
            handleRemove(); 
          }}>
          <Trash />
        </button>
      </div>
    </div>
  );
}
