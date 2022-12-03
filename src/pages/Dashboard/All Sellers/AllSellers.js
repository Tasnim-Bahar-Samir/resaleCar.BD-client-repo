import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import toast from "react-hot-toast";
import Spinner from "../../../Components/Spinner";

const AllSellers = () => {
  const [deletingData, setDeletingData] = useState(null)
  console.log(deletingData)
  const { data,refetch,isLoading } = useQuery({
    queryKey: ['seller'],
    queryFn: () =>
      fetch("https://assignment-12-server-side-kohl.vercel.app/users/seller",{
        headers: {
          authorization : localStorage.getItem('resale_token')
        }
      }).then((res) => res.json())
  });

console.log(data)
//verifying seller by admin
  const handleVerify = (id)=> {
    fetch(`https://assignment-12-server-side-kohl.vercel.app/user/verified/${id}`,{
      method: 'PUT',
      headers:{
        authorization: localStorage.getItem('resale_token')
      }
    })
    .then(res => res.json())
    .then(data=>{
      console.log(data)
      if(data.success){
        refetch()
      }
    })
  }
  if(isLoading){
    return <div className="h-96 flex items-center justify-center"><Spinner/></div>
  }
  const allSellers = data?.data
//code for deleting seller
  const handleDelete = (seller) =>{
    console.log(seller)
    fetch(`https://assignment-12-server-side-kohl.vercel.app/users/${seller._id}`,{
      method:"DELETE",
      headers:{
        authorization: localStorage.getItem('resale_token')
      }
    })
    .then(res => res.json())
    .then(data =>{
      if(data.success){
        toast.success(data.message)
        setDeletingData(null)
        refetch()
      }
    })
  }

  const handleCloseModal = ()=>{
    setDeletingData(null)
  }
  
  return (
    <div className="md:mx-20">
      <h3 className="text-4xl text-center font-semibold my-5">All Sellers</h3>
      <div className="overflow-x-auto border-2 rounded-md bg-slate-100 p-2">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allSellers?.map((seller,index) => (
              <tr key={seller._id}>
                <th>{index+1}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td className={`${seller?.status?"text-green-700 font-semibold": ''}`}>{seller.status? seller.status: <button onClick={()=> handleVerify(seller._id)} className="btn btn-sm">Verify</button>}</td>
                <td><label onClick={() => setDeletingData(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {
        deletingData && 
        <ConfirmationModal
        title = 'Are you sure to delete the user?'
        desc = "If you delete once you wont be able to recover it."
        data = {deletingData}
        closeModal = {handleCloseModal}
        modalAction = {handleDelete}
        />
      }
    </div>
  );
};

export default AllSellers;
