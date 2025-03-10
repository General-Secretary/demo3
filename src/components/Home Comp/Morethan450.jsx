import React from 'react'
import Image from 'next/image';

import { Vazirmatn } from 'next/font/google';

const vazir = Vazirmatn({
    subsets: ['arabic'],
    weight: ['400', '700']
});
export default function MoreThan450() {

    return (
        <div className='px-10'>
            <div className='w-full sm:w-[70%] md:w-[55%] lg:w-[35%] mx-auto'>
                <h3 className='text-center font-vazir text-white font-extrabold text-3xl'>  اكثر من <span className='text-[#00F560]'>450+ مستثمر</span> موثوق </h3>
                <p className='text-center font-vazir text-white font-thin text-xs'>قاعدة هائلة من المستثمرين والخبراء مستعدين لتقديم الدعم المالي واللوجيستي وتقديم الاستشارات والتوجيهات بشكل مباشر من خلال جلسات مراسلة أو التفاعل مع الأفكار وتقييمها</p>
            </div>
            <div className='flex mx-auto  flex-wrap justify-around items-center'>
                <div className='md:w-1/3 w-full'>
                    <div className='sm:w-[70%]  my-5 md:w-[80%] lg:w-[70%]  mx-auto overflow-hidden'>
                        <div className='relative rounded-2xl overflow-hidden bg-slate-400'>
                            <Image unoptimized src={"/assits/WIN_20250219_13_35_27_Pro.jpeg"} width={400} className='mx-auto w-full rounded-2xl' height={400} alt=' ' />
                            <div className='morethan450 rounded-2xl flex justify-center items-end absolute top-0 left-0 right-0 bottom-0 '>
                                <div className='flex w-[70%] justify-around items-center h-2/5'>
                                    <div className='w-1/3'>
                                        <div className='w-[50px] h-[50px] bg-[#258a20] border border-[#14ff72] rounded-xl'> </div>
                                    </div>
                                    <div className='w-2/3 text-center flex justify-center flex-col'>
                                        <h4 className='text-center font-vazir text-white  font-extrabold text-base'>محمد ابو النجا نجاتي</h4>
                                        <p className='text-center font-vazir text-gray-400  font-thin text-xs'>Founder of CH Beauty</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:w-1/3 w-full'>
                    <div className='sm:w-[70%] my-5  md:w-[80%] lg:w-[70%]  mx-auto overflow-hidden'>
                        <div className='relative rounded-2xl overflow-hidden bg-slate-400'>
                            <Image unoptimized src={"/assits/WIN_20250219_13_35_27_Pro.jpeg"} width={400} className='mx-auto w-full rounded-2xl' height={400} alt=' ' />
                            <div className='morethan450 rounded-2xl flex justify-center items-end absolute top-0 left-0 right-0 bottom-0 '>
                                <div className='flex w-[70%] justify-around items-center h-2/5'>
                                    <div className='w-1/3'>
                                        <div className='w-[50px] h-[50px] bg-[#258a20] border border-[#14ff72] rounded-xl'> </div>
                                    </div>
                                    <div className='w-2/3 text-center flex justify-center flex-col'>
                                        <h4 className='text-center font-vazir text-white  font-extrabold text-base'>محمد ابو النجا نجاتي</h4>
                                        <p className='text-center font-vazir text-gray-400  font-thin text-xs'>Founder of CH Beauty</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:w-1/3 w-full'>
                    <div className='sm:w-[70%] my-5  md:w-[80%] lg:w-[70%]  mx-auto overflow-hidden'>
                        <div className='relative rounded-2xl overflow-hidden bg-slate-400'>
                            <Image unoptimized src={"/assits/WIN_20250219_13_35_27_Pro.jpeg"} width={400} className='mx-auto w-full rounded-2xl' height={400} alt=' ' />
                            <div className='morethan450 rounded-2xl flex justify-center items-end absolute top-0 left-0 right-0 bottom-0 '>
                                <div className='flex w-[70%] justify-around items-center h-2/5'>
                                    <div className='w-1/3'>
                                        <div className='w-[50px] h-[50px] bg-[#258a20] border border-[#14ff72] rounded-xl'> </div>
                                    </div>
                                    <div className='w-2/3 text-center flex justify-center flex-col'>
                                        <h4 className='text-center font-vazir text-white  font-extrabold text-base'>محمد ابو النجا نجاتي</h4>
                                        <p className='text-center font-vazir text-gray-400  font-thin text-xs'>Founder of CH Beauty</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
