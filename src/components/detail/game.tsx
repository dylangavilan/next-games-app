'use client'
import React, { useEffect, useState } from 'react'
import { useGameStore } from '@/store/useGamesStore';
import { getCover } from '@/lib/utils';
import { parseCompanies } from '@/app/detail/[id]/utils';
import { useToastStore } from '@/store/useToastStore';
import Game from '@/components/detail/game-info';
import Image from 'next/image';
import Carousel from '@/components/detail/game-carousel';
import H2 from '@/components/ui/h2';
import Chips from '@/components/detail/game-chips';
import Summary from './game-summary';
import Platforms from './game-platforms';

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
  
  const coverImg = game.cover?.image_id ?? 'nocover'

  return (
    <div className='flex flex-col gap-6 min-h-screen'>
          <Game cover={getCover('cover_big', coverImg)} 
                name={game.name} 
                url={game.url} 
                company={game.involved_companies ? parseCompanies(game.involved_companies) : 'No company'} 
                handleCollect={handleCollect} 
                isCollected={isCollected}/>
          <Chips game={game} />
          <Summary game={game} />
          <Platforms game={game} />

          {game.screenshots && 
              <div className='flex flex-col gap-4'>
                  <H2>Media</H2>
                  <Carousel items={game.screenshots}/> 
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
    </div>
  )
}

export default GameDetail