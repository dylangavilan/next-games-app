import { Swords } from 'lucide-react'
import React from 'react'


const IconHeader = () => {
  return (
    <div className='w-6 h-6 lg:h-8 lg:w-8 border-aera-pink-600 
                    border items-center flex justify-center 
                    rounded-lg bg-white backdrop-blur-[32px] bg-opacity-80'>
        <Swords  className='w-3 h-3 lg:h-4 lg:w-4 text-aera-violet-900'/>
    </div>
  )
}
export default IconHeader