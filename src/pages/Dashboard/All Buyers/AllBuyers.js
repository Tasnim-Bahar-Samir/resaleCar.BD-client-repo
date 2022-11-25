import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllBuyers = () => {
  const { data ={} } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch("http://localhost:5000/users/buyer",{
        headers: {
          authorization : localStorage.getItem('resale_token')
        }
      }).then((res) => res.json()),
  });
  const AllBuyers = data?.data;
  return (
    <div className="m-10">
      <h2>All buyers</h2>
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
              <button className="btn btn-sm btn-warning">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
};

export default AllBuyers;
