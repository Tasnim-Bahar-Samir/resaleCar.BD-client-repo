import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ConfirmationModal from "../../../Components/ConfirmationModal";

const AllBuyers = () => {
  const [deletingData, setDeletingData] = useState(null)
  const { data ={},refetch } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch("http://localhost:5000/users/buyer",{
        headers: {
          authorization : localStorage.getItem('resale_token')
        }
      }).then((res) => res.json()),
  });

  const handleCloseModal = ()=>{
    setDeletingData(null)
  }
  const handleDeleteBuyer = (seller) =>{
    console.log(seller)
    fetch(`http://localhost:5000/users/${seller._id}`,{
      method:"DELETE",
      headers:{
        authorization: localStorage.getItem('resale_token')
      }
    })
    .then(res => res.json())
    .then(data =>{
      if(data.success){
        setDeletingData(null)
        refetch()
      }
    })
  }

  const AllBuyers = data?.data;
  return (
    <div className="md:mx-20"
    >
      <h2 className="text-4xl text-center font-semibold my-5">All buyers</h2>
      <div className=" border-2 rounded-md bg-slate-100 p-2">
      <table className="table w-full">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {AllBuyers?.map((buyer, index) => (
          <tr key={buyer._id}>
            <th>{index + 1}</th>
            <td>{buyer.name}</td>
            <td>{buyer.email}</td>
            <td>
              <label htmlFor="confirmation-modal" onClick={()=> setDeletingData(buyer)} className="btn btn-sm btn-error">Delete</label>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      </div>
      {
        deletingData &&
        <ConfirmationModal
      title="Are you sure to delete this user"
      desc= "If you delete once you wont be able to recover it."
      data= {deletingData}
      closeModal = {handleCloseModal}
      modalAction = {handleDeleteBuyer}
      />
      }
    </div>
  );
};

export default AllBuyers;
