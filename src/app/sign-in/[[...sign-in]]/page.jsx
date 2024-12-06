import React from 'react'
import Image from 'next/image'


import Link from 'next/link'
import { SignIn, SignInButton } from '@clerk/nextjs';
import logo from '../../../../public/logo.png'
const page = () => {
  return (
    
    <div >
 
        <div className='fixed sticky w-full h-36 shadow-xl bg-nav_color'>
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
            <Link href='/sign-up'>
              <button className="px-6 py-2 bg-orange-300 text-white font-medium rounded-full shadow-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"> Sign Up</button>
            </Link>
            </div>
        </div>

        <div className='flex justify-center p-11'>

        <SignIn forceRedirectUrl="/" />
        </div>
    </div>
  )
}

export default page