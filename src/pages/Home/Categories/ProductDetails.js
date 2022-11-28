import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import OrderModal from '../../../Components/OrderModal';
import ReportModal from '../../../Components/ReportModal';
import Spinner from '../../../Components/Spinner';
import { authProvider } from '../../../Context/UserContext';
import Product from './Product';

const ProductDetails = () => {
    const {user} = useContext(authProvider)
    const{name} = useParams()
    const [products,setProducts] = useState([])
    const [product , setProduct] = useState(null)
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        fetch(`https://assignment-12-server-side-kohl.vercel.app/category/${name}`,{
            headers:{
                authorization : localStorage.getItem('resale_token')
            }
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data.data)
            setLoading(false)
        })

    },[name])

    if(loading){
       return <div className='h-96 flex items-center justify-center'><Spinner/></div>
    }

    console.log(products)
    if(products?.length === 0){
     return   <div className='h-screen flex items-center justify-center'><p className='text-xl font-semibold'>No products available in this category.Please visit other categories.</p></div>
    }
   
    return (
    <div>
        <div className='md:mx-24 mx-4 min-h-screen mt-9'>
        <h2 className="text-2xl text-center font-semibold my-5">Available car in this category</h2>
        {
            products?.map(product => <Product product = {product} key={product._id} setProduct = {setProduct}/>)
        }
      
    </div>
        {
            product && 
            <OrderModal product = {product} setProduct= {setProduct}/>
        }
        {
            product && 
            <ReportModal setProduct={setProduct} product = {product}/>
        }
    </div>
  )
}

export default ProductDetails