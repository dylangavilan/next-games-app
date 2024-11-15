import { LoaderCircle } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className='bg-none min-h-screen flex flex-col items-center'> 
        <LoaderCircle className='animate-spin mx-auto'/>
    </div>
  )
}

export default Loading