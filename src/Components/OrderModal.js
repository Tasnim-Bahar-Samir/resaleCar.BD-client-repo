import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { authProvider } from '../Context/UserContext'

const OrderModal = ({product,setProduct}) => {
    const {user} = useContext(authProvider)
    const handleOrder = (e)=>{
        e.preventDefault()
        const form = e.target;
        const order = {
            productImage:product.image,
            productName: product.name,
            price: product.resalePrice,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerPhone: form.phone.value,
            location: form.location.value,
        }
        fetch('http://localhost:5000/orders',{
            method:"POST",
            headers:{
                'content-type' : 'application/json',
                authorization : localStorage.getItem('resale_token')
            },
            body: JSON.stringify(order)

        })
        .then(res => res.json())
        .then(data =>{
            if(data.success){
                toast.success(data.message);
                setProduct(null)
            }else{
                toast.error(data.message)
            }
        })
        console.log(order)
    }
  return (
    <div>
    <input type="checkbox" id="order-modal" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box relative">
        <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        {/* <h3 className="text-lg font-bold">Congratulations random Internet user!</h3> */}
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
            <input
              type="submit"
              value="Submit"
              className="btn btn-accent input-bordered text-white w-full"
            />
          </form>
      </div>
    </div></div>
  )
}

export default OrderModal