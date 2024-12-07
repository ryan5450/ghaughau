import Image from 'next/image'
import React from 'react'
import logo from '../public/logo.png'
import Link from 'next/link'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='fixed sticky w-full h-36 shadow-none bg-nav_color'>
        
        <div className='flex justify-between items-center h-full w-full px-4 2xl:px-16'>
        <Link href='/'>
        <Image 
        src = {logo}
        alt = "Logo"
        width = "150"
        height = "75"
        className = "cursor-pointer"
        priority
        />
        </Link>
        <SignedOut>

        <SignInButton>
                <button className="px-6 py-2 bg-orange-300 text-white font-medium rounded-full shadow-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"> Sign in</button>
        </SignInButton>

            
        </SignedOut>
        <SignedIn>
            <UserButton>

            </UserButton>
             
        </SignedIn>
        </div>


        
        
    </nav>
  )
}

export default Navbar