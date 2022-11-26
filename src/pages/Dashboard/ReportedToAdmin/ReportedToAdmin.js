import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../Components/ConfirmationModal';

const ReportedToAdmin = () => {
    const [deletingData, setDeletingData] = useState(null)
    const{data,refetch} = useQuery({ 
        queryKey:[],
        queryFn: ()=> fetch('http://localhost:5000/product/reported').then(res => res.json())
    })


    const handleCloseModal = ()=>{
        setDeletingData(null)
    }


    const handleDelete = (product)=>{
        console.log(product)
        fetch(`http://localhost:5000/product/${product._id}`,{
            method:"DELETE",
            headers:{
                authorization: localStorage.getItem('resale_token')
              }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success){
                toast.success(data.message)
                refetch()
            }
        })
    }

    const reportedProducts = data?.data;
  return (
    <div className='m-10'>
      <div className='grid md:grid-cols-2 gap-5'>
      {
        reportedProducts?.map(product => {
            return <div key={product._id} className='p-5 border-2 rounded-sm'>
                <div>
                    <img src={product.image} className='rounded-sm' alt="" />
                </div>
                <div>
                <p className='text-md font-semibold'>{product.name}</p>
                    <p>Product Id: <span className='text-md font-semibold'>{product._id}</span></p>
                    <h5>Reprted By: <span className='text-md font-semibold'>{product.reported?.reportedBy}</span></h5>
                    <p>Report Message: <span className='text-md font-semibold'>{product.reported?.reportMessage}</span></p>
                </div>
                <div className='flex w-full justify-end'>
                    <label onClick={()=> setDeletingData(product)} htmlFor='confirmation-modal' className='btn btn-md btn-error '>Delete</label>
                </div>
            </div>
        })
       }
       
      </div>
      {
        deletingData &&
        <ConfirmationModal
      title = 'Are you sure to delete the product?'
      desc = "If you delete once it wont be showed to user."
      data = {deletingData}
      closeModal = {handleCloseModal}
      modalAction = {handleDelete}
      />
      }
    </div>
  )
}

export default ReportedToAdmin