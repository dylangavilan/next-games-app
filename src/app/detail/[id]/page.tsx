'use client'
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
import { getDate, parseGenres, parsePlatforms } from './utils';
import Image from 'next/image';

function Page() {
  const { id } = useParams()
  const [isCollected, setIsCollected] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [game, setGame] = useState<GameDetail | null>(null)
  const { addGame, removeGame, isLoading } = useGameStore(state => state)
  
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
  }, [id])

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
    return <div className='bg-none min-h-screen'> is Fetching </div>
  }


  
  return (
    <div className='flex flex-col gap-6 min-h-screen'>
      {game &&
        <>
          <Game cover={getCover('cover_small', game.cover.image_id)} name={game.name} enterprise='Rockstar' />
          <Button variant={!isCollected ? 'primary' : 'secondary'} onClick={handleCollect} loading={isLoading}>
            {!isCollected ? 'Collect game' : 'Game collected'}
          </Button>
          <div className='flex flex-wrap gap-2'>
            <Chip type='rating' value={game?.rating?.toFixed(1) ?? 'None'} />
            <Chip type='release' value={game.first_release_date ? getDate(game.first_release_date) : 'Not available'} />
            <Chip type='genre' value={parseGenres(game.genres)} />
          </div>
          <div>
            <H2>Summary</H2>
            <H4 className='text-[#666666]'>
              {game.summary}
            </H4>
          </div>
          <div>
            <H2>Platforms</H2>
            <H4 className='text-[#666666]'>
              {parsePlatforms(game.platforms)}
            </H4>
          </div>

          <div className='flex flex-col gap-4'>
            <H2>Similar games</H2>
            <div className='lg:ca gap-2 grid grid-cols-3 lg:grid-cols-4'>
              {game.similar_games?.map((game: SimilarGame) => (
                <Image key={game.cover.image_id} src={getCover('cover_big', game.cover.image_id)} className='w-32 h-40 lg:w-[170px] lg:h-[226px] rounded-lg' alt='similar game'/>
              ))}
            </div>
          </div>
        </>

      }
    </div>
  )
}

export default Page