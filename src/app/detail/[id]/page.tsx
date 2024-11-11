'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Game from '@/components/detail/game';
import { getGameByID } from '@/services/api';
import Button from '@/components/button';
import { useGameStore } from '@/store/useGamesStore';
import { getCover } from '@/lib/utils';
import Chip from '@/components/detail/chip';
import H2 from '@/components/h2';
import H4 from '@/components/h4';

type Props = {}

function Page({}: Props) {
  const { id } = useParams()
  const [isCollected, setIsCollected] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [game, setGame] = useState<GameDetail | null>(null)
  const { addGame, savedGames, removeGame, isLoading } = useGameStore(state => state)
  
  const checkIsCollected = (gameId: number) => {
    return useGameStore.getState().savedGames.some((savedGame: Game) => savedGame.id ==gameId)
  }

  useEffect(() => {
    if(id && typeof id === 'string') {
      setIsFetching(true)
      getGameByID(id)
      .then((response: GameDetail) => { 
        setGame(response);
        setIsCollected(checkIsCollected(response.id))
      })
      .finally(() => setIsFetching(false))
    }
  }, [])

  const handleCollect = () => {
    if(game){
    
    if(isCollected){
      removeGame(game.id)
    } else {
      addGame(game)
    }
    setIsCollected(checkIsCollected(game.id))
  }
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
          <div className='flex flex-wrap gap-2'>
            <Chip type='rating' value={'9/16/2013'} />
            <Chip type='rating' value={'9/16/2013'} />
            <Chip type='rating' value={'9/16/2013'} />
          </div>
          <div>
            <H2>Summary</H2>
            <H4 className='text-[#666666]'>Grand Theft Auto V is a vast open world game set in Los Santos, a sprawling sun-soaked metropolis struggling to stay afloat in an era of economic uncertainty and cheap reality TV. The game blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game’s three lead characters, playing all sides of the game’s interwoven story.</H4>
          </div>
        </>

      }
    </div>
  )
}

export default Page