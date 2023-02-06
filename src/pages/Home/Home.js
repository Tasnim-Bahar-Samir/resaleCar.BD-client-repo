import React from 'react'
import AdvertisedProducts from './AdvertisedProducts/AdvertisedProducts'
import Banner from './Banner/Banner'
import Categories from './Categories/Categories'
import Subscribe from './Subscribe/Subscribe'
import TopBrands from './TopBrands/TopBrands'

const Home = () => {
  return (
    <div className='w-full'>
      <Banner/>
      <Categories/>
      <AdvertisedProducts/>
      <TopBrands/>
      <Subscribe/>
    </div>
    
  )
}

export default Home