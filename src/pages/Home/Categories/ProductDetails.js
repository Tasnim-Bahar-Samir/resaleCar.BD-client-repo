import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigation, useParams } from 'react-router-dom';
import OrderModal from '../../../Components/OrderModal';
import Spinner from '../../../Components/Spinner';
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
    </div>
  )
}

export default ProductDetails