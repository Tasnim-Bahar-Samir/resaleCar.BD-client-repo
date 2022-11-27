import React from 'react'
import toyota from '../../../assets/images/toyota.png'
import suzuki from '../../../assets/images/suzuki.png'
import mercendes from '../../../assets/images/mercedes-benz.png'
import hyundai from '../../../assets/images/hyundai.png'
import nissan from '../../../assets/images/nissan.jpg'

const TopBrands = () => {
  return (
    <div className='md:mx-10 mx-4 my-10'>
        <h2 className='text-5xl text-center m-10 mb-5'>Top Brands</h2>
        <div className='flex md:flex-nowrap flex-wrap justify-center gap-5 items-center'>
           <div>
           <img className='w-40 md:w-fit' src={toyota} alt="" />
           </div>
           <div>
           <img className='w-40 md:w-fit' src={suzuki} alt="" />
           </div>
           <div>
           <img className='w-40 md:w-fit' src={hyundai} alt="" />
           </div>
           <div>
           <img className='w-40 md:w-fit' src={nissan} alt="" />
           </div>
           <div>
           <img className='w-40 md:w-fit' src={mercendes} alt="" />
           </div>

        </div>
    </div>
  )
}

export default TopBrands