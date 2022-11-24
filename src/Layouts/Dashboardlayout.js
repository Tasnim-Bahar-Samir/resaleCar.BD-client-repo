import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashboardlayout = () => {
  return (
    <div>
        <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content text-left">
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    <Outlet/>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
      <li><Link to='/dashboard/addProduct'>Publish Product</Link></li>
      <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
      <li><Link to='/dashboard/myProducts'>My Products</Link></li>
      <li><Link to='/dashboard/allSellers'>All Sellers</Link></li>
      <li><Link>All Buyers</Link></li>
    </ul>
  
  </div>
</div>
    </div>
  )
}

export default Dashboardlayout