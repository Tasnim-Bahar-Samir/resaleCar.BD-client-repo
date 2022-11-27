import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_51M6Y2GFFVS7OUdBj03GSxKXn3PrelWosqx36pe47ln97rKN20oDqgVkGxE2Dtd11CvZFduBT3IhcoHDJeXwSjNPn00YDTMdb9h');
const Payment = () => {
    const {data} = useLoaderData()
  return (

    <div className='m-5 md:m-10'>
        <h2>Payment for - {data.productName}</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm order = {data}/>
        </Elements>
    </div>
  )
}

export default Payment