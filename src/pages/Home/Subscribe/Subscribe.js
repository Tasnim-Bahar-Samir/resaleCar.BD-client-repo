import React from 'react'
import { toast } from 'react-hot-toast'

const Subscribe = () => {
    const handleSubscribe = (e)=>{
        e.preventDefault();
        e.target.reset()
        toast.success('Subscribed Successfully')
    }
  return (
    <div className='py-16 bg-blue-200 mt-32 text-center'>
        <h4 className='text-xl font-semibold mb-6'>Subscribe to get updated!</h4>
        <form onSubmit={handleSubscribe}>
            <input className='px-10 py-3 outline-none rounded-l-md' type="email" name="" id="" required/>
            <button className='bg-blue-600 p-3 text-white rounded-r-md'>Subscribe</button>
        </form>
    </div>
  )
}

export default Subscribe