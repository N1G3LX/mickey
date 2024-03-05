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
                    logo
                </div>
                <ul className='hidden md:flex gap-4 '>
                    {navLinks.map((link) => (
                        <li key={link.id}>

                            <Link href={link.href}>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className='md:flex hidden gap-4 '>
                    <Button variant="outline">Login</Button>
                    <Button >Signup</Button>


                </div>
                <div className='md:hidden flex'>
                        <MenuIcon />
                </div>
            </nav>
        </header>
    )
}

export default Header