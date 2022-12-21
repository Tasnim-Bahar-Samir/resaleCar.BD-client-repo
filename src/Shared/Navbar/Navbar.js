import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authProvider } from "../../Context/UserContext";

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
        <li><Link className='ml-5' to='/'>Home</Link></li>
        <li><Link className='ml-5' to='/blogs'>Blogs</Link></li>
        
        {
          user?.uid ?
          <>
            <li><Link className='ml-5' to='/dashboard'>Dashboard</Link></li>
          <li onClick={handleLogout}><Link className='bg-blue-600 text-white px-5 py-2 rounded-lg ml-5'>Logout</Link></li>
          </>
          :
          <li><Link className=" bg-blue-600 text-white px-5 py-2 rounded-lg ml-5" to='/login'>Login</Link></li>
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
          <Link to='/' className="normal-case font-bold text-xl text-blue-500">ResaleCar.Bd</Link>
        </div>
        <div className="navbar-center hidden lg:flex ml-auto">
          <ul className="menu menu-horizontal p-0">
           {
            menuItem
           }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
