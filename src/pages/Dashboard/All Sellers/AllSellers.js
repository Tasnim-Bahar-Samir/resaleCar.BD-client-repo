import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "../../../Components/ConfirmationModal";

const AllSellers = () => {
  const [deletingData, setDeletingData] = useState(null)
  console.log(deletingData)
  const { data } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch("http://localhost:5000/users/seller",{
        headers: {
          authorization : localStorage.getItem('resale_token')
        }
      }).then((res) => res.json())
  });

  const handleDelete = (seller) =>{
    console.log(seller)
    fetch(`http://localhost:5000/users/${seller._id}`,{
      method:"DELETE",
      headers:{
        authorization: localStorage.getItem('resale_token')
      }
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data)
    })
  }

  const handleCloseModal = ()=>{
    setDeletingData(null)
  }

  // console.log(data?.data);
  const allSellers = data?.data
  return (
    <div>
      <h3>All Sellers</h3>
      <div className="overflow-x-auto">
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
                <td><button className="btn btn-sm">Verify</button></td>
                <td><label onClick={() => setDeletingData(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-warning">Delete</label></td>
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
