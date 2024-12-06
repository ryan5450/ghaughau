import React from 'react'
import { SignUp } from "@clerk/nextjs";
import Navbar from '../../../../components/Navbar';

const page = () => {
  return (
    
    <div >
        <Navbar/>
        <div className='flex justify-center p-11'>

        <SignUp/>
        </div>
    </div>
  )
}

export default page