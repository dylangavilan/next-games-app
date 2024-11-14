'use client'
import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo-mobile.png"
import { usePathname, useRouter } from 'next/navigation'
import H1 from './h1'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {} & PropsWithChildren

const Header = ({children}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <header className={
            cn('flex flex-col gap-5 lg:items-center',
            pathname !== '/' && 'lg:flex-row lg:justify-center lg:items-start lg:gap-4'      
    )}>
        <nav className='flex items-center'>
            {
                pathname === '/' ?
                    <div className='flex items-center'>
                    <Image src={logo} alt="" width={24} height={24} />
                    <H1 className='text-aera-violet-600'>
                        Gaming Haven Z
                    </H1>
                    </div> :
                    <button className='flex gap-2 items-center text-aera-violet-600 font-bold' onClick={router.back}>
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