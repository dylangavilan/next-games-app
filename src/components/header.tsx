'use client'
import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo-mobile.png"
import { usePathname } from 'next/navigation'
import H1 from './h1'

type Props = {} & PropsWithChildren

const Header = ({children}: Props) => {
    const pathname = usePathname()
    console.log(pathname)
  return (
    <header>
        <nav className='flex items-center'>
            {
                pathname === '/' ?
                    <>
                    <H1>
                        <Image src={logo} alt="" width={24} height={24} />
                        Gaming Haven Z
                    </H1>
                    </> :
                    <h1>Go back</h1>
            }
        </nav>
        {children}
    </header>
  )
}

export default Header