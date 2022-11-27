import React from 'react'
import AdvertisedProducts from './AdvertisedProducts/AdvertisedProducts'
import Banner from './Banner/Banner'
import Categories from './Categories/Categories'
import TopBrands from './TopBrands/TopBrands'

const Home = () => {
  return (
    <div className='w-full'>
      <Banner/>
      <Categories/>
      <AdvertisedProducts/>
      <TopBrands/>
    </div>
    
  )
}

export default Home