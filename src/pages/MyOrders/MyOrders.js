import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authProvider } from "../../Context/UserContext";

const MyOrders = () => {
  const { user } = useContext(authProvider);
  const { data,isLoading } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetch(`https://assignment-12-server-side-kohl.vercel.app/orders?email=${user?.email}`, {
        headers: {
          authorization: localStorage.getItem("resale_token"),
        },
      }).then((res) => res.json()),
  });
  const orders = data?.data;
  if(orders?.length === 0){
    return <div className="md:m-20 m-10"><p className="text-xl font-semibold">You have not ordered any product to show.</p></div>
  }
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
              {orders?.map((order,i) => (
                <tr key={order._id}>
                  <th>{i+1}</th>
                  <td><img src={order.productImage} className='w-20 rounded-xl' alt="" /></td>
                  <td>{order.productName}</td>
                  <td>{order.price}</td>
                  <td>{
                    order?.paid ?
                    <p className="text-green-700 font-semibold">Paid</p>
                    :
                    <Link to={`/dashboard/payment/${order._id}`} className="btn btn-sm btn-secondary">Pay Now</Link>
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
