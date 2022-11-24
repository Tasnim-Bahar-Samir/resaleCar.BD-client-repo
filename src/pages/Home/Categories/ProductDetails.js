import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from 'react-router-dom';
import Product from './Product';
const ProductDetails = () => {
    const products = useLoaderData().data;
    console.log(products)
    return (
    <div className='mx-10 min-h-screen mt-9'>
        {
            products.map(product => <Product product = {product} key={product._id}/>)
        }
    </div>
  )
}

export default ProductDetails