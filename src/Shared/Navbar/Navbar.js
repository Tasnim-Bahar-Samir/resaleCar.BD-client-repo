import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authProvider } from "../../Context/UserContext";
import {GiHamburgerMenu} from "react-icons/gi"
import logo1 from '../../assets/images/bannerImg.png'

const Navbar = () => {
  const {user,userLogout} = useContext(authProvider)
  const navigate = useNavigate()
  const handleLogout = ()=>{
  userLogout()
  .then(()=>{
    navigate('/login')
  })
  .catch(err => console.error(err))
  }
    const menuItem = <>
        <li><NavLink className='ml-5 rounded-md' to='/'>Home</NavLink></li>
        <li><NavLink className='ml-5 rounded-md' to='/blog'>Blog</NavLink></li>
        
        {
          user?.uid ?
          <>
            <li><NavLink className='ml-5 rounded-md' to='/dashboard'>Dashboard</NavLink></li>
          <li onClick={handleLogout}><Link className='border-4 rounded-md border-blue-500 ml-5 text-blue-500'>Logout</Link></li>
          </>
          :
          <li><Link className="border-4 text-blue-500 rounded-md border-blue-500 ml-5" to='/login'>Login</Link></li>
        }
    </>
  return (
    <div>
      <div className="navbar bg-slate-100 shadow-lg mb-3 md:px-14">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {
                menuItem
              }
            </ul>
          </div>
          <Link className="flex items-center" to='/'><img className="w-10" src={logo1} alt="" />
          <a to='/' className="btn btn-ghost normal-case text-xl text-blue-500">ResaleCar.Bd</a></Link>
        </div>
        <div className="navbar-center hidden lg:flex ml-auto">
          <ul className="menu menu-horizontal p-0">
           {
            menuItem
           }
          </ul>
        </div>
        <label htmlFor="dashboard-drawer" tabIndex={1} className="btn btn-ghost lg:hidden ml-auto">
              <GiHamburgerMenu/>
            </label>
      </div>
    </div>
  );
};

export default Navbar;
