import React from 'react'
import './Banner.css'

const Banner = () => {
  return (
    <div className='flex justify-center items-center md:h-[650px] h-[550px] w-full banner '>
        <div className='text-white text-center'>
        <h2 className='text-4xl md:text-6xl font-bold text-white '><span className='text-blue-500'>Find</span> your  next car with us.</h2>
        <p className='md:w-2/3 mt-3 mx-auto'>You can sell your used car through us by login as a seller. And you can parchase used car by login as a buyer. </p>
        </div>
    </div>
  )
}

export default Banner