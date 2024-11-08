'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Game from '@/components/detail/game';
import { getGameByID } from '@/services/api';
import Button from '@/components/button';
import { useGameStore } from '@/store/useGamesStore';
import { getCover } from '@/lib/utils';

type Props = {}

function Page({}: Props) {
  const { id } = useParams()
  const [isCollected, setIsCollected] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [game, setGame] = useState<GameDetail | null>(null)
  const { addGame, savedGames, removeGame, isLoading } = useGameStore(state => state)
  
  useEffect(() => {
    if(id && typeof id === 'string') {
      setIsFetching(true)
      getGameByID(id)
      .then((response: GameDetail) => { 
        setGame(response);
        setIsCollected(useGameStore.getState().savedGames.some((savedGame: Game) => savedGame.id == response.id))
      })
      .finally(() => setIsFetching(false))
    }
  }, [])

  const handleCollect = () => {
    if(!game) return;

    if(isCollected){
      removeGame(game.id)
    } else {
      addGame(game)
    }
    setIsCollected(savedGames.some((savedGame: Game) => savedGame.id == game.id))
    //logica de toast
  }

  if(isFetching) {
    return <div> is Fetching </div>
  }

  return (
    <div className='flex flex-col gap-6'>
      {game &&
        <>
          <Game cover={getCover('cover_small', game.cover.image_id)} name={game.name} enterprise='Rockstar' />
          <Button variant={!isCollected ? 'primary' : 'secondary'} onClick={handleCollect} loading={isLoading}>
            {!isCollected ? 'Collect game' : 'Game collected'}
          </Button>
        </>

      }
    </div>
  )
}

export default Page