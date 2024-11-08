'use client'
import Card from '@/components/card'
import Tabs from '@/components/tabs'
import { useGameStore } from '@/store/useGamesStore'
import React from 'react'
type Props = {}

const Home = (props: Props) => {
  const { savedGames } = useGameStore(state => state)
//   console.log()
  return (
    <main>

      <Tabs />
      <div className='flex gap-2'>
        {savedGames.map((game: Game) => (
          <Card {...game} />
        ))}
      </div>
    </main>
  )
}

export default Home