import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Components/ConfirmationModal';
import { authProvider } from '../../Context/UserContext'

const MyProduts = () => {
    const [deletingData,setDeletingData] = useState(null)
    const {user} = useContext(authProvider);
    const {data, refetch} = useQuery({
        queryKey: [user?.email],
        queryFn:()=> fetch(`http://localhost:5000/myProducts?email=${user?.email}`,{
            headers:{
                authorization: localStorage.getItem('resale_token')
            }
        }).then(res => res.json())
    })

    console.log(data)

    const handleAdvertise = (product)=>{
      fetch(`http://localhost:5000/product/advertise/${product._id}`,{
        method:"PUT",
        headers:{
          authorization: localStorage.getItem('resale_token')
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          toast.success(data.message)
          refetch()
        }else{
          toast.error(data.message)
        }
      })
    }

    const handleDelete = (product)=>{
      console.log(product)
      fetch(`http://localhost:5000/product/${product._id}`,{
        method:"DELETE",
        headers:{
          authorization : localStorage.getItem('resale_token')
        }
      })
      .then(res => res.json())
      .then(data => {
        toast.success(data?.message)
        setDeletingData(null)
        refetch()
      })
    }

    const handleCloseModal = ()=>{
      setDeletingData(null)
    }

    const products = data?.data;
console.log(products)
    if(products?.length === 0){
      return <div className="md:m-20 m-10"><p className="text-xl font-semibold">You have not published any product to show.</p></div>
    }

  return (
    <div className='m-10 md:flex gap-3'>
        {
            products?.map(product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl text-left mb-3">
            <figure className="px-10 pt-10">
              <img src={product.image} alt="Shoes" className="rounded-xl w-full" />
            </figure>
            <div className="card-body  text-left">
              <div className='flex justify-between w-full'>
              <h2 className="card-title">{product.name}</h2>
              <h4 className={`text-lg text-green-700 font-semibold`}>{product?.status}</h4>
              </div>
              <p className='text-left'>Price: <span className='text-md font-semibold'>TK {product.resalePrice}</span></p>
              <div className="card-actions flex justify-between">
                <label htmlFor='confirmation-modal' onClick={()=>setDeletingData(product)} className="px-3 cursor-pointer py-2 bg-red-500 text-white rounded-sm">Delete</label>
                <button onClick={()=>handleAdvertise(product)} className='px-3 py-2 bg-green-500 rounded-sm text-white'>{product.advertised?'Advertised':'Advertise'}</button>
              </div>
            </div>
          </div>)
        }
        {
          deletingData &&
          <ConfirmationModal
        title="Are you sure to delete the product?"
        desc="If you delete once this product would not displayed anywhere."
        data={deletingData}
        modalAction= {handleDelete}
        closeModal = {handleCloseModal}
        />
        }
    </div>
  )
}

export default MyProduts