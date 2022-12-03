import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import Spinner from '../../../Components/Spinner';

const ReportedToAdmin = () => {
    const [deletingData, setDeletingData] = useState(null)
    const{data,refetch, isLoading} = useQuery({ 
        queryKey:['reported'],
        queryFn: ()=> fetch('https://assignment-12-server-side-kohl.vercel.app/product/reported').then(res => res.json())
    })


    const handleCloseModal = ()=>{
        setDeletingData(null)
    }


    const handleDelete = (product)=>{
        console.log(product)
        fetch(`https://assignment-12-server-side-kohl.vercel.app/product/${product._id}`,{
            method:"DELETE",
            headers:{
                authorization: localStorage.getItem('resale_token')
              }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success){
                setDeletingData(null)
                toast.success(data.message)
                refetch()
            }
        })
    }

    if(isLoading){
        return <div className='flex h-96 items-center justify-center'><Spinner/></div>
    }

    const reportedProducts = data?.data;
    console.log(reportedProducts)

    if(reportedProducts?.length === 0){
        return <div className="md:m-20 m-10"><p className="text-xl font-semibold">No report found to show.</p></div>
      }
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