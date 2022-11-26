import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../Shared/Navbar/Navbar'

const Dashboardlayout = () => {
  return (
    <div>
    <Navbar/>
        <div className="drawer drawer-mobile drawer-end">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content text-left">
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    <Outlet/>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-52 bg-slate-200 pt-8 text-base-content">
      
    <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
      <li><Link to='/dashboard/addProduct'>Publish Product</Link></li>
      <li><Link to='/dashboard/myProducts'>My Products</Link></li>
      <li><Link to='/dashboard/allSellers'>All Sellers</Link></li>
      <li><Link to='/dashboard/allBuyers'>All Buyers</Link></li>
      <li><Link to='/dashboard/ReportedItems'>Reported Items</Link></li>
    </ul>
  
  </div>
</div>
    </div>
  )
}

export default Dashboardlayout