import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { authProvider } from "../Context/UserContext";
import useRole from "../Hooks/useRole";
import Navbar from "../Shared/Navbar/Navbar";

const Dashboardlayout = () => {
  const { user } = useContext(authProvider);
  const { isAdmin, isSeller, isBuyer } = useRole(user?.email);
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile drawer-end">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content text-left">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-52 bg-slate-100 pt-8 text-base-content">
            {
              isBuyer &&
              <li className=" border-b-2">
              <Link to="/dashboard/myOrders">My Orders</Link>
            </li>
            }
            {isSeller && (
              <>
                <li className=" border-b-2">
                  <Link to="/dashboard/addProduct">Publish Product</Link>
                </li>
                <li className=" border-b-2">
                  <Link to="/dashboard/myProducts">My Products</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li className=" border-b-2">
                  <Link to="/dashboard/allSellers">All Sellers</Link>
                </li>
                <li className=" border-b-2">
                  <Link to="/dashboard/allBuyers">All Buyers</Link>
                </li>
                <li className=" border-b-2">
                  <Link to="/dashboard/ReportedItems">Reported Items</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
