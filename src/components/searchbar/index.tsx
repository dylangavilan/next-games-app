'use client'
import React, { ChangeEvent, useState } from 'react'
import Select from './options'
import { searchGames } from '@/services/api'
import OptionImage from './option-image'
import { LoaderCircle, Search } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useOutsideClick } from '@/hooks/useOutsideClick'


const Searchbar = () => {
  const router = useRouter()
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [games, setGames] = useState<Array<Game> | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getList = async (input: string) => {
    setIsFetching(true)
    try {
        const response = await searchGames(input)
        setGames(response)
    }
    catch(err){
        console.log(err)
    }
    finally {
        setIsFetching(false)
    }
  }

  const handleSelect = (game: Game) => {
    router.push('/detail/' + game.id)
    setGames(null)    
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length > 3){
        getList(e.target.value)
    } else {
        setGames(null)
    }
  }
  const ref = useOutsideClick(() => setGames(null));

  return (
    <div className="relative w-full max-w-sm z-50" ref={ref} >
        <div className="absolute inset-y-0  left-3 bottom-0 flex items-center pointer-events-none">
            <Search className={cn(isFocus ? 'text-aera-violet-600' : 'text-aera-gray-200', 'w-4 transition-all duration-300' )} />
        </div>
        <input type='search' 
               placeholder='Search games...' 
               className={cn('rounded-[20px] border-2 px-2 w-full py-2.5 pl-8 outline-none  border-aera-pink-200 focus:border-aera-violet-900', 
                         (games || isFetching) && '!border-aera-pink-600 rounded-b-none')}
               onChange={handleChange}
        />
            
        <Select options={games} isLoading={isFetching}>
            {isFetching ? 
                <Select.Item>
                    <LoaderCircle className='mx-auto animate-spin text-aera-gray-200'/>
                </Select.Item> 
            :
            games?.map((game) => (
                <Select.Item key={game.id} handleSelect={() => handleSelect(game)}>
                        {game.cover && (
                             <OptionImage cover={game.cover}/>
                        )}
                        {game.name}
                </Select.Item>
            ))}
        </Select>
     </div>
  )
}

export default Searchbar