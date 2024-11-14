import { LoaderCircle } from 'lucide-react'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <LoaderCircle className='animation-spin'/>
  )
}

export default Loading