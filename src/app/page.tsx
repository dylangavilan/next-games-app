'use client'
import Card from '@/components/card'
import Tabs from '@/components/tabs'
import { useGameStore } from '@/store/useGamesStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

type Option = 'newest' | 'last_added' | 'oldest'

const Home = () => {
  const { savedGames, removeGame } = useGameStore(state => state)
  const [games, setGames] = useState<GameWithTimestamp[]>(savedGames)
  const router = useRouter()

  useEffect(() =>{
    setGames(savedGames)
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
      <Tabs handleSort={handleSort}/>
      <div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
        {games?.map((game: Game) => (
            <Card {...game} key={game.id} handleRemove={() => removeGame(game.id)} onClick={() => router.push('/detail/' + game.id)} />
        ))}
      </div>
    </div>
  )
}

export default Home