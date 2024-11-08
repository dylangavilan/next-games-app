import { getCover } from '@/lib/utils'
import { Trash } from 'lucide-react';
import React from 'react'

type Props = {}

export default function Card(props: Game) {
  return (
    <div className="relative w-28 h-[9.5rem]">
      <img
        src={getCover('cover_small', props.cover.image_id)}
        alt=""
        className="rounded-lg border-2 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0  w-full h-full rounded-lg">
        <button className="absolute bottom-2 right-2 rounded-full w-10 h-10 bg-aera-gray-0 flex items-center justify-center">
          <Trash />
        </button>
      </div>
    </div>
  );
}