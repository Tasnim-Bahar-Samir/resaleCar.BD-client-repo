import Dashboardlayout from "../Layouts/Dashboardlayout";
import Main from "../Layouts/Main";
import Blog from "../pages/Blog/Blog";
import AddProduct from "../pages/Dashboard/Addproduct/AddProduct";
import AllBuyers from "../pages/Dashboard/All Buyers/AllBuyers";
import AllSellers from "../pages/Dashboard/All Sellers/AllSellers";
import Dashboard from "../pages/Dashboard/Dashboard";
import Error from "../pages/Error/Error";
import ProductDetails from "../pages/Home/Categories/ProductDetails";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

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
                path:'/category/product/:name',
                element:<ProductDetails/>,
                loader: ({params})=> fetch(`http://localhost:5000/category/${params.name}`)
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
                element: <Blog/>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboardlayout/>,
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
        ]
    }
])