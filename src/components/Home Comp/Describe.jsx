import React from 'react'
import { Vazirmatn } from 'next/font/google';
import Image from 'next/image'
import charity from "/public/assits/9b2418014ec8bfa6c4453f26c54e57c8.PNG"
import supportive from "/public/assits/a987f0341e3156c51ebd63296773d265.PNG"
import investor from "/public/assits/ca1e1cd98ef8a7072e82ad0683e4de45.PNG"
import startup from "/public/assits/33b79edb64b2778583faff1b90e8cc51.PNG"
import Link from 'next/link';
const vazir = Vazirmatn({
    subsets: ['arabic'],
    weight: ['400', '700']
});
export default function Describe({ marginTop }) {
    return (<>
        <div id='describeSection' className={`mb-36 ${marginTop} z-10`}>
            <h2 className='text-center font-vazir text-white my-10 font-extrabold text-4xl'>ما هو الوصف الأنسب لك؟</h2>
            <div className='flex justify-around md:w-[80%] flex-wrap mx-auto  items-center'>
                <Link href={"/charity"} className='w-full xs:w-[50%] lg:w-[25%] md:p-5 lg:p-7 my-5'>
                    <div className=" w-[80%] mx-auto h-[300px]  bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                        <div className=' relative transform scale-125 md:scale-150 hover:scale-[1.75] transition-transform duration-300  z-10'>
                            <Image unoptimized src={charity} width={400} height={400} alt="" className="relative  z-10" />
                        </div><h4 className='text-center  lg:mt-10 font-vazir text-white  font-extrabold text-2xl'>مؤسسه خيريه</h4>
                    </div>
                </Link>
                <Link href={"/IncubatorSignUp"} className='w-full xs:w-[50%] lg:w-[25%] md:p-5 lg:p-7 my-5'>
                    <div className=" w-[80%] mx-auto h-[300px]   bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                        <div className=' relative transform scale-125 md:scale-150 hover:scale-[1.75] transition-transform duration-300  z-10'>
                            <Image unoptimized src={supportive} width={400} height={400} alt="" className="relative  z-10" />
                        </div>  <h4 className='text-center lg:mt-10  font-vazir text-white  font-extrabold text-2xl'>منظمه داعمه</h4>
                    </div>
                </Link>
                <Link href={"/InvestorSignUp"} className='w-full xs:w-[50%] lg:w-[25%] md:p-5 lg:p-7 my-5'>
                    <div className=" w-[80%] mx-auto h-[300px]   bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                        <div className=' relative transform scale-125 md:scale-150 hover:scale-[1.75] transition-transform duration-300  z-10'>
                            <Image unoptimized src={investor} width={400} height={400} alt="" className="relative  z-10" />
                        </div> <h4 className='text-center lg:mt-10  font-vazir text-white  font-extrabold text-2xl'>مستثمر</h4>
                    </div>
                </Link>
                <Link href={"/startUpSignUp"} className='w-full xs:w-[50%] lg:w-[25%] md:p-5 lg:p-7 my-5'>
                    <div className=" w-[80%] mx-auto h-[300px]   bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                        <div className=' relative transform scale-125 md:scale-150 hover:scale-[1.75] transition-transform duration-300  z-10'>
                            <Image unoptimized src={startup} width={400} height={400} alt="" className="relative  z-10" />
                        </div><h4 className='text-center lg:mt-10  font-vazir text-white  font-extrabold text-2xl'>شركة ناشئه</h4>
                    </div>
                </Link>
            </div>
        </div>
    </>
    )
}
