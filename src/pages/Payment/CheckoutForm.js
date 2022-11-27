import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({order}) => {
  const navigate = useNavigate()
  const {buyerName,buyerEmail,price,_id,productId} = order;
  const [cardError,setCardError] = useState('')
  const [clientSecret,setClientSecret] = useState('')

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch("https://assignment-12-server-side-kohl.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!stripe || !elements){
      return;
    }


    const card = elements.getElement(CardElement);
    if(card === null){
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if(error){
      setCardError(error.message)
    }else{
      setCardError('')
    }

    const { paymentIntent, error: confirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: buyerName,
            email: buyerEmail,
          },
        },
      });

      if(confirmationError){
        setCardError(confirmationError.message)
        return;
      }
      if(paymentIntent.status === 'succeeded'){
        const payment = {
          productId,
          price,
          buyerEmail,
          orderId: _id,
          transactionId: paymentIntent.id
        }
        fetch("https://assignment-12-server-side-kohl.vercel.app/payments",{
        method: "POST",
        headers: {
            'content-type':'application/json',
            authorization: localStorage.getItem('doc_port_token')
        },
        body: JSON.stringify(payment)
      })
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          toast.success("Your payment completed successfuly")
          navigate('/dashboard/myOrders')
        }
      })
      }
  }

  return (
   <>
     <form  className='w-96 shadow-xl p-10' onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-md btn-success my-5' type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    {
      cardError && <p className='text-red-600'>{cardError}</p>
    }
    
   </>

  )
}

export default CheckoutForm