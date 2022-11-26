import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderModal from '../../../Components/OrderModal'
import ReportModal from '../../../Components/ReportModal'
import Product from '../Categories/Product'

const AdvertisedProducts = () => {
    const [advertisedProducts, setAdvertisedProducts] = useState([])
    const [product , setProduct] = useState(null)
    useEffect(()=>{
        axios.get('http://localhost:5000/Products/advertised')
    .then((res)=> {
        console.log(res.data.data)
        // setAdvertisedProducts(res.data.data)
        if(res.data.success){
            setAdvertisedProducts(res.data.data)
        }
    })
    .catch((err)=> console.log(err))
    },[])
    
    console.log(advertisedProducts)
  return (
    <>
    {
        advertisedProducts.length > 0 &&
        <div className='my-12 md:mx-32'>
            <h1 className='text-5xl text-center m-10 mb-5'>Advertised Products</h1>
    
            {advertisedProducts.map(product => <Product key={product._id} product={product} setProduct={setProduct}/>)}
            </div>
   }
        {
            product && 
            <OrderModal product = {product} setProduct= {setProduct}/>
        },
        {
            product &&
            <ReportModal setProduct={setProduct}  product = {product}/>
        }
    </>
  )
}


export default AdvertisedProducts