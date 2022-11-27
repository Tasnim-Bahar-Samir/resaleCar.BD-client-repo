import React from 'react'
import './Banner.css'

const Banner = () => {
  return (
    <div className='flex banner items-center md:px-12 py-28'>
        <div className='text-white'>
        <h2 className='text-5xl font-bold text-white '>Buy your <br /> <span className='text-blue-500'>next car from us.</span></h2>
        <p className='md:w-1/2'>You can sell your used car through us by login as a seller. And you can parchase used car by login as a buyer. </p>
        </div>
    </div>
  )
}

export default Banner