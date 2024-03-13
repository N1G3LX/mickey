import React from 'react'
import { Button } from "@/components/ui/button"
import { navLinks } from '../../../utils/CONSTANTS'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

const Header = () => {
    return (
        <header className=" py-6 shadow-md w-full">
            <nav className=' generalContainer flex justify-between  '>
                <div className='text-xl'>
                    Mickey Token Holders Watch
                </div>
                
            </nav>
        </header>
    )
}

export default Header