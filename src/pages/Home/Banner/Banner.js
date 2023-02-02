import React from 'react'
import './Banner.css'
import {MdAccessTimeFilled} from 'react-icons/md'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillTelephoneFill} from 'react-icons/bs'

const Banner = () => {
  return (
    <div className='relative'>
    <div className='flex mb-32 justify-center items-center md:h-[650px] h-[550px] w-full banner -z-40'>
        <div className='text-white text-center'>
        <h2 className='text-4xl md:text-6xl font-bold text-white '><span className='text-blue-500'>Find</span> your  next car with us.</h2>
        <p className='md:w-2/3 mt-3 mx-auto'>You can sell your used car through us by login as a seller. And you can parchase used car by login as a buyer. </p>
        </div>
    </div>
    <div className='px-10 py-14 rounded-md md:flex justify-between shadow-lg md:w-2/3 mx-auto absolute left-1/2 -translate-x-1/2 z-50 bottom-[-70px] bg-white'>
      <div>
        <MdAccessTimeFilled className='text-blue-500 text-xl'/>
        <p className='text-xl font-semibold'>Sunday-Thursday, 10am-6pm</p>
      </div>
      <div>
        <HiLocationMarker className='text-blue-500 text-xl'/>
        <p className='text-xl font-semibold'>Mirpur-10,Dhaka.</p>
      </div>
      <div >
        <BsFillTelephoneFill className='text-blue-500 text-xl'/>
        <p className='text-xl font-semibold'>+8801785658246</p>
      </div>
    </div>
    </div>
  )
}

export default Banner