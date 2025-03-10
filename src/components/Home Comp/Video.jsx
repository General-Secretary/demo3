"use client"
import React from 'react';
import { Vazirmatn } from 'next/font/google';
import ReactPlayer from 'react-player';
import BlobAnimation from '../BlobAnimation';
const vazir = Vazirmatn({
    subsets: ['arabic'],
    weight: ['400', '700']
});
const Video = () => {
    return (
        <div className='relative' >
            <div className='  my-52'>
                <h3 className='text-center font-vazir my-24 text-white  font-extrabold text-4xl'>ابدأ رحلة استثمارية جديدة مع <span className='text-[#00F560]'>     إستثمارات </span > </h3>
                <div className='md:w-2/3 overflow-auto bg-black rounded-2xl z-30 relative  w-[90%] mx-auto'>
                    <ReactPlayer url='./assits/3571264-uhd_3840_2160_30fps.mp4' width={"100%"} controls />
                </div>
            </div>
        </div>
    );
};

export default Video;
