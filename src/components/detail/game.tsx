'use client'
import React, { useEffect, useState } from 'react'
import { useGameStore } from '@/store/useGamesStore';
import { getCover } from '@/lib/utils';
import { getDate, parseCompanies, parseGenres, parsePlatforms } from '@/app/detail/[id]/utils';
import { useToastStore } from '@/store/useToastStore';
import Game from '@/components/detail/game-info';
import Chip from '@/components/detail/game-chip';
import Image from 'next/image';
import Screenshots from '@/components/detail/game-screenshots';
import H4 from '@/components/ui/h4';
import H2 from '@/components/ui/h2';

function GameDetail({ game }: {game: GameDetail}) {
  const [isCollected, setIsCollected] = useState<boolean>(false);
  const { addGame, removeGame } = useGameStore(state => state)
  const { addToast } = useToastStore(state => state)

  const checkIsCollected = (gameId: number) => {
    return useGameStore.getState().savedGames.some((savedGame: Game) => savedGame.id ==gameId)
  }

  useEffect(() => {
    setIsCollected(checkIsCollected(game.id))
  }, [game])

  const handleCollect = () => {
    if(isCollected){
      removeGame(game.id)
      addToast('removed', 'Game uncollected', game.name + ' has been removed from your collection')
    } else {
      addGame(game)
      addToast('added',  'Game collected', game.name + ' has been added to your collection')
    }
    setIsCollected(checkIsCollected(game.id))
  }
  
  return (
    <div className='flex flex-col gap-6 min-h-screen'>
        <>
          {/* <Game cover={getCover('cover_big', game.cover?.image_id)} 
                name={game.name} 
                url={game.url} 
                company={game.involved_companies ? parseCompanies(game.involved_companies) : 'No company'} 
                handleCollect={handleCollect} 
                isCollected={isCollected}/> */}
          <div className='flex flex-wrap gap-2'>
            <Chip type='rating' value={game?.rating?.toFixed(1) ?? 'None'} />
            <Chip type='release' value={game.first_release_date ? getDate(game.first_release_date) : 'Not available'} />
            <Chip type='genre' value={parseGenres(game.genres)} />
          </div>
          <div className='flex flex-col gap-4'>
            <H2>Summary</H2>
            <H4 className='text-aero-gray-400'>
              {game.summary}
            </H4>
          </div>
          <div className='flex flex-col gap-4'>
            <H2>Platforms</H2>
            <H4 className='text-aero-gray-400'>
              {parsePlatforms(game.platforms)}
            </H4>
          </div>
          {game.screenshots && 
              <div className='flex flex-col gap-4'>
                  <H2>Media</H2>
                  <Screenshots items={game.screenshots}/> 
              </div>
          }
          {game.similar_games?.length > 0 && 
            <div className='flex flex-col gap-4'>
              <H2>Similar games</H2>
              <div className='gap-2 grid grid-cols-3 sm:grid-cols-4'>
                {game.similar_games.map((game: SimilarGame) => (
                  <div className='relative h-[152px] w-[114px] lg:w-[170px] lg:h-[226px]' key={game.name}>
                    <Image key={game.cover.image_id}
                           src={getCover('cover_big', game.cover.image_id)}
                           alt="Similar game"
                           className="w-full h-full top-0 left-0 object-cover rounded-lg"
                           fill
                    />
                  </div>
                ))}
              </div>
            </div>
          }
        </>
    </div>
  )
}

export default GameDetail