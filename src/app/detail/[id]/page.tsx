'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Game from '@/components/detail/game';
import { getImage } from '@/app/constants';
import { getGameByID } from '@/services/api';
import Button from '@/components/button';
import { useGameStore } from '@/store/useGamesStore';

type Props = {}

function Page({}: Props) {
  const { id } = useParams()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [game, setGame] = useState<GameDetail | null>(null)
  const { addGame, savedGames } = useGameStore(state => state)
  console.log(savedGames)
  useEffect(() => {
    if(id && typeof id === 'string') {
      setIsFetching(true)
      getGameByID(id).then((response: GameDetail) =>{ 
        setGame(response)})
      .finally(() => setIsFetching(false))
    }
  }, [])
  const handleCollect = () => {
    console.log('game')
    if(!game) return;
    addGame(game)
  }
  if(isFetching) {
    return <div> is Fetching </div>
  }
  
  return (
    <div className='flex flex-col gap-6'>
      {game &&
        <>
          <Game cover={getImage('cover_small', game.cover.image_id)} name={game.name} enterprise='Rockstar' />
          <Button variant='primary' onClick={handleCollect}>
            Collect game
          </Button>
        </>

      }
    </div>
  )
}

export default Page