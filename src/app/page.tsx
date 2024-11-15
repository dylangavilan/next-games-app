'use client'
import Card from '@/components/card'
import Tabs from '@/components/tabs'
import { useGameStore } from '@/store/useGamesStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import not_saved from '@/assets/not-saved.png'
import H2 from '@/components/h2'
import H4 from '@/components/h4'

type Option = 'newest' | 'last_added' | 'oldest'

const Home = () => {
  const { savedGames, removeGame } = useGameStore(state => state)
  const [games, setGames] = useState<GameWithTimestamp[]>(savedGames)
  const router = useRouter()

  useEffect(() => {
    setGames(savedGames);
  }, [savedGames])
  

  const sortLastAdded = useMemo(() => {
    return () => [...games].sort((a, b) => b.timestamp - a.timestamp)
  }, [games])

  const sortNewest = useMemo(() => {
    return () =>
      [...games].sort(
        (a, b) => (b.first_release_date || 0) - (a.first_release_date || 0)
      );
  }, [games]);
  
  const sortOldest = useMemo(() => {
    return () =>
      [...games].sort(
        (a, b) => (a.first_release_date || 0) - (b.first_release_date || 0)
      );
  }, [games]);

  const handleSort = (option: Option) => {
    let sortFunction;
    switch (option) {
      case 'last_added':
        sortFunction = sortLastAdded;
        break;
      case 'newest':
        sortFunction = sortNewest;
        break;
      case 'oldest':
        sortFunction = sortOldest;
        break;
      default:
        return;
    }
    setGames(sortFunction());
  }
  
  return (
    <div className='flex flex-col gap-4 lg:items-center'>
      <Tabs handleSort={handleSort} />
      {games.length > 0 ? 
        <div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
          {games.map((game: Game) => (
              <Card {...game} key={game.id} handleRemove={() => removeGame(game.id)} onClick={() => router.push('/detail/' + game.id)} />
          ))}
        </div>
        :
        <div className='text-center flex flex-col gap-6'>
          <Image src={not_saved} width={358} height={168} alt='not images saved'/>
          <div> 
            <H2>Nothing collected yet </H2>
            <H4 className='text-aero-gray-400'>Here you will see your collected games</H4>
          </div>
        </div>
      }
    </div>
  )
}

export default Home