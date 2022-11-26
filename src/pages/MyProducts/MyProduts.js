import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { authProvider } from '../../Context/UserContext'

const MyProduts = () => {
    const {user} = useContext(authProvider);
    const {data} = useQuery({
        queryKey: [user?.email],
        queryFn:()=> fetch(`http://localhost:5000/myProducts?email=${user?.email}`,{
            headers:{
                authorization: localStorage.getItem('resale_token')
            }
        }).then(res => res.json())
    })

    const handleAdvertise = (product)=>{
      fetch(`http://localhost:5000/product/advertise/${product._id}`,{
        method:"PUT",
        headers:{
          authorization: localStorage.getItem('resale_price')
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      })
    }

    const products = data?.data;
  return (
    <div>
        {
            products?.map(product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl text-left">
            <figure className="px-10 pt-10">
              <img src={product.image} alt="Shoes" className="rounded-xl w-full" />
            </figure>
            <div className="card-body items-center text-left">
              <div className='flex justify-between w-full'>
              <h2 className="card-title">{product.name}</h2>
              <h4 className={`text-lg text-green-700 font-semibold`}>{product?.sold ? 'Sold':'Available'}</h4>
              </div>
              <p>Price: {product.price}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Delete</button>
                <button onClick={()=>handleAdvertise(product)} className='btn'>Advertise</button>
              </div>
            </div>
          </div>)
        }
    </div>
  )
}

export default MyProduts