import { getCover } from '@/lib/utils'
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Props = {
  handleRemove: () => void
  onClick: () => void
} & Game

export default function Card(props: Props) {
  return (
    <div className="relative sm:w-36 sm:h-48 lg:w-44 lg:h-56 w-28 h-40 cursor-pointer" onClick={props.onClick}>
      <Image
        src={getCover('cover_big', props.cover.image_id)}
        alt={props.name}
        sizes="(max-width: 640px) 112px, (max-width: 1024px) 176px"
        fill
        className="rounded-lg border-2 w-full h-full object-cover "
      />
      <div className="absolute top-0 left-0 w-full h-full rounded-lg">
        <button 
          className="absolute bottom-2 right-2 z-20 rounded-full w-10 h-10 bg-aero-gray-0 flex items-center justify-center" 
          onClick={(e) => {
            e.stopPropagation(); 
            props.handleRemove(); 
          }}>
          <Trash />
        </button>
      </div>
    </div>
  );
}
