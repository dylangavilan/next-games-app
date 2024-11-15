'use client'
import React, { PropsWithChildren } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import H1 from './h1'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import IconHeader from './header-icon'

type Props = {} & PropsWithChildren

const Header = ({children}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <header className={
            cn('flex flex-col gap-5 pt-4 lg:items-center',
            pathname !== '/' && 'lg:flex-row lg:justify-center lg:gap-4'      
    )}>
        <nav className='flex items-center'>
            {
                pathname === '/' ?
                    <div className='flex items-center gap-2'>
                    <IconHeader />
                    <H1 className='text-aero-violet-600'>
                        Gaming Haven Z
                    </H1>
                    </div> :
                    <button className='flex gap-2 items-center text-aero-violet-600 font-bold' onClick={() => router.replace('/')}>
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