import { async } from "@firebase/util";
import Dashboardlayout from "../Layouts/Dashboardlayout";
import Main from "../Layouts/Main";
import Blog from "../pages/Blog/Blog";
import AddProduct from "../pages/Dashboard/Addproduct/AddProduct";
import AllBuyers from "../pages/Dashboard/All Buyers/AllBuyers";
import AllSellers from "../pages/Dashboard/All Sellers/AllSellers";
import Dashboard from "../pages/Dashboard/Dashboard";
import ReportedToAdmin from "../pages/Dashboard/ReportedToAdmin/ReportedToAdmin";
import Error from "../pages/Error/Error";
import ProductDetails from "../pages/Home/Categories/ProductDetails";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyProduts from "../pages/MyProducts/MyProduts";
import Payment from "../pages/Payment/Payment";
import Register from "../pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        errorElement:<Error/>,
        children: [
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/category/:name',
                element:<ProtectedRoute><ProductDetails/></ProtectedRoute>,
                
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/blog',
                element: <ProtectedRoute><Blog/></ProtectedRoute>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<ProtectedRoute><Dashboardlayout/></ProtectedRoute>,
        errorElement: <Error/>,
        children: [
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/dashboard/addProduct',
                element:<AddProduct/>
            },
            {
                path:'/dashboard/allSellers',
                element:<AllSellers/>
            },
            {
                path:'/dashboard/allBuyers',
                element:<AllBuyers/>
            },
            {
                path:'/dashboard/myProducts',
                element:<MyProduts/>
            },
            {
                path:'/dashboard/myOrders',
                element:<MyOrders/>
            },
            {
                path:'/dashboard/reportedItems',
                element:<ReportedToAdmin/>
            },
            {
                path:'/dashboard/payment/:id',
                element: <Payment/>,
                loader: ({params})=> fetch(`http://localhost:5000/orders/${params.id}`)
            }
        ]
    }
])