import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { authProvider } from "../../Context/UserContext";

const MyOrders = () => {
  const { user } = useContext(authProvider);
  const { data } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(`http://localhost:5000/orders?email=${user?.email}`, {
        headers: {
          authorization: localStorage.getItem("resale_token"),
        },
      }).then((res) => res.json()),
  });
  const orders = data?.data;
  return (
    <>
      <div className="md:mx-20">
        <h1 className="text-4xl text-center font-semibold my-5">Ordered Products</h1>
        <div className="overflow-x-auto border-2 rounded-md bg-slate-100 p-2">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Avatar</th>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order,i) => (
                <tr key={order._id}>
                  <th>{i+1}</th>
                  <td><img src={order.productImage} className='w-20 rounded-xl' alt="" /></td>
                  <td>{order.productName}</td>
                  <td>{order.price}</td>
                  <td>{
                    order?.paid ?
                    <p>Paid</p>
                    :
                    <button className="btn btn-sm btn-secondary">Pay Now</button>
                  }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
