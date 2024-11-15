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
import { useToastStore } from '@/store/useToastStore';

function Page() {
  const { id } = useParams()
  const [isCollected, setIsCollected] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [game, setGame] = useState<GameDetail | null>(null)
  const { addGame, removeGame, isLoading } = useGameStore(state => state)
  const { addToast } = useToastStore(state => state)
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
        addToast('removed', 'Game uncollected', game.name + ' has been removed from your collection')
      } else {
        addGame(game)
        addToast('added',  'Game collected', game.name + ' has been added to your collection')
      }
      setIsCollected(checkIsCollected(game.id))
    }
  }
  
  const parseCompanies = () => (game?.involved_companies.map(({company}) => (company.name) ).join(', ').trim() ?? '')

  if(isFetching) {
    return <div className='bg-none min-h-screen'> is Fetching </div>
  }
  console.log()
  return (
    <div className='flex flex-col gap-6 min-h-screen'>
      {game &&
        <>
          <Game cover={getCover('cover_big', game.cover.image_id)} name={game.name} url={game.url} company={parseCompanies()}/>
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
            <H4 className='text-aero-gray-400'>
              {game.summary}
            </H4>
          </div>
          <div>
            <H2>Platforms</H2>
            <H4 className='text-aero-gray-400'>
              {parsePlatforms(game.platforms)}
            </H4>
          </div>

          <div className='flex flex-col gap-4'>
            <H2>Similar games</H2>
            <div className=' gap-2 grid grid-cols-3 sm:grid-cols-4'>
              {game.similar_games?.map((game: SimilarGame) => (
                <div className='relative w-28 h-36 sm:w-36 sm:h-44 md:w-[170px] md:h-[226px]' key={game.cover.image_id}>
                  <Image src={getCover('cover_big', game.cover.image_id)} 
                    className='rounded-lg' 
                    fill
                    alt='similar game' />
                </div>
              ))}
            </div>
          </div>
        </>

      }
    </div>
  )
}

export default Page