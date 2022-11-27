import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import OrderModal from '../../../Components/OrderModal';
import ReportModal from '../../../Components/ReportModal';
import Product from './Product';

const ProductDetails = () => {
    const{name} = useParams()
    const [products,setProducts] = useState([])
    const [product , setProduct] = useState(null)
    console.log(products)
    useEffect(()=>{
        fetch(`http://localhost:5000/category/${name}`)
        .then(res => res.json())
        .then(data => {
            setProducts(data.data)
        })

    },[name])
    

    console.log(products)
    if(products?.length === 0){
     return   <div className='h-screen flex items-center justify-center'><p className='text-xl font-semibold'>No products available in this category.Please visit other categories.</p></div>
    }
   
    return (
    <div>
        <div className='md:mx-24 mx-4 min-h-screen mt-9'>
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