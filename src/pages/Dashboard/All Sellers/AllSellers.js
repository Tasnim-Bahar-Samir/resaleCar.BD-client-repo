import React from "react";
import { useQuery } from "@tanstack/react-query";

const AllSellers = () => {
  const { data } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch("http://localhost:5000/users/seller",{
        headers: {
          authorization : localStorage.getItem('resale_token')
        }
      }).then((res) => res.json()),
  });
  console.log(data?.data);
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
                <td><button className="btn btn-sm btn-warning">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
