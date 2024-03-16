'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

const Header = () => {
    const router = useRouter()
  const {setIsAuthenticated } = useAuthContext()
    return (
        <header className=" border-b border-slate-300 py-6 shadow-md w-full">
            <nav className=' generalContainer flex justify-between items-center  '>
                <div className='text-base md:text-xl font-bold'>
                    Mickey Token Holders 
                </div>

                

                <Button
                className=''
                onClick={() => {
                    setIsAuthenticated(false)
                    router.push('/')
                }}
                variant={'destructive'}>
                    Log out
                </Button>
                
            </nav>
        </header>
    )
}

export default Header