'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Game from '@/components/detail/game';
import { getImage } from '@/app/constants';
import { getGameByID } from '@/services/api';
import Button from '@/components/button';

type Props = {}

function Page({}: Props) {
  const { id } = useParams()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    if(id && typeof id === 'string') {
      setIsFetching(true)
      getGameByID(id).then((response: Game) =>{ 
        setGame(response)})
      .finally(() => setIsFetching(false))
    }
  }, [])

  if(isFetching) {
    return <div> is Fetching </div>
  }
  
  return (
    <div className='flex flex-col gap-6'>
      {game &&
        <>
          <Game cover={getImage('cover_small', game.cover.image_id)} name={game.name} enterprise='Rockstar' />
          <Button variant='primary'>
            Collect game
          </Button>
        </>

      }
    </div>
  )
}

export default Page