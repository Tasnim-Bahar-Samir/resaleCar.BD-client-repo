import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { authProvider } from '../Context/UserContext'
import Spinner from './Spinner'

const OrderModal = ({product,setProduct}) => {
    const {user} = useContext(authProvider)
    const[loading,setLoading] = useState(false)
    const handleOrder = (e)=>{
      setLoading(true)
        e.preventDefault()
        const form = e.target;
        const order = {
            productId:product._id,
            productImage:product.image,
            productName: product.name,
            price: product.resalePrice,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerPhone: form.phone.value,
            location: form.location.value,
        }
        console.log(order)
        fetch('https://assignment-12-server-side-kohl.vercel.app/orders',{
            method:"POST",
            headers:{
                'content-type' : 'application/json',
                authorization : localStorage.getItem('resale_token')
            },
            body: JSON.stringify(order)

        })
        .then(res => res.json())
        .then(data =>{
          setLoading(false)
            if(data.success){
                toast.success(data.message);
                setProduct(null)
            }else{
                toast.error(data.message)
            }
        })
        
    }
    console.log(product)
  return (
    <div>
    <input type="checkbox" id="order-modal" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box relative">
        <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <form onSubmit={handleOrder} className="grid grid-cols-1 gap-5 mt-11">
            <input
              type="text"
              disabled
              defaultValue={user?.displayName}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Email"
              defaultValue={user?.email}
              className="input input-bordered w-full"
              disabled
            />
            <input
              type="text"
              defaultValue={product.image}
              className="input input-bordered w-full"
              disabled
            />
            <input
              type="text"
              defaultValue={product.name}
              className="input input-bordered w-full"
              disabled
            />
            <input
              type="text"
              defaultValue={product.resalePrice}
              className="input input-bordered w-full"
              disabled
            />
            <input
              type="text"
              name = "phone"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name = "location"
              placeholder="Meeting Location"
              className="input input-bordered w-full"
              required
            />
            <button type="submit"
              className="btn input-bordered text-white w-full">{loading ? <Spinner/>:'Submit'}</button>
          </form>
      </div>
    </div></div>
  )
}

export default OrderModal