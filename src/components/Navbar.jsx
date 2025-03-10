import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='fixed top-0  bg-[#07152d] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10   left-0 z-50 right-0'>
            <div className='w-full bg-[#07152d] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  '>
                <Link href={"/"} ><img src={"/assits/logo.png"} className='w-[151px]' alt="" /></Link>
            </div>
        </div>
    )
}
