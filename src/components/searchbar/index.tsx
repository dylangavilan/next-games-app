'use client'
import React, { ChangeEvent, useState } from 'react'
import Select from './options'
import SelectItem from './option-item'
import { searchGames } from '@/services/api'
import OptionImage from './option-image'
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {}

const Searchbar = (props: Props) => {
  const router = useRouter()
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [games, setGames] = useState<Array<Game>>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
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
    setGames([])
    
  }
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length > 3){
        getList(e.target.value)
    } else { 
        setGames([])
    }
  }

  return (
    <div className="relative w-full max-w-sm pb-8 z-50">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className={cn(isFocus ? 'text-aera-violet-600' : 'text-aera-gray-200', 'w-4 transition-all duration-300' )} />
        </div>
        <input type='search' 
               placeholder='Search games...' 
               onFocus={() => setIsFocus(true)}
               onBlur={() => setIsFocus(false)}
               className={cn('rounded-[20px] border px-2 w-full py-2.5 pl-8 outline-none', 
                         isFocus && 'border-aera-violet-900',
                         games.length > 0 && '!border-aera-pink-600 rounded-b-none')}
               onChange={handleChange}
               />
        {games?.length > 0 && 
            <Select optionsLength={games.length}>
                {games?.map((game) => (
                <SelectItem key={game.id} handleSelect={() => handleSelect(game)}>
                        {game.cover && (
                            <OptionImage cover={game.cover}/>
                        )}
                        {game.name}
                </SelectItem>
                ))}

            </Select>
        }
     </div>
  )
}

export default Searchbar