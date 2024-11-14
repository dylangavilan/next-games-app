'use client'
import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo-mobile.png"
import { usePathname, useRouter } from 'next/navigation'
import H1 from './h1'
import { ArrowLeft } from 'lucide-react'

type Props = {} & PropsWithChildren

const Header = ({children}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <header className='flex flex-col gap-5 lg:items-center'>
        <nav className='flex items-center'>
            {
                pathname === '/' ?
                    <>
                    <H1>
                        <Image src={logo} alt="" width={24} height={24} />
                        Gaming Haven Z
                    </H1>
                    </> :
                    <button className='flex gap-2 items-center text-aera-violet-900 font-bold' onClick={router.back}>
                        <ArrowLeft className=''/>
                        Back
                    </button>
            }
        </nav>
        {children}
    </header>
  )
}

export default Header