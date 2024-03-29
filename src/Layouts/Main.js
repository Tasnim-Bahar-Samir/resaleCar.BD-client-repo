import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Footer/Footer'
import Navbar from '../Shared/Navbar/Navbar'

const Main = () => {
  return (
    <div>
        <Navbar/>
        <div className='max-w-[1540px] mx-auto'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Main