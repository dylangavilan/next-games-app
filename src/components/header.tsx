'use client'
import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo-mobile.png"
import { usePathname } from 'next/navigation'

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
                        <Image src={logo} alt="" width={24} height={24} />
                        Gaming Haven Z
                    </> :
                    <h1>Go back</h1>
            }
        </nav>
        {children}
    </header>
  )
}

export default Header