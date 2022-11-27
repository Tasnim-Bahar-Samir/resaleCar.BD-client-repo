import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'


const CheckoutForm = ({order}) => {
  const {buyerName,buyerEmail,price,_id,productId} = order;
  const [cardError,setCardError] = useState('')
  const [successMessage,setSuccessMessage] = useState('')
  const [clientSecret,setClientSecret] = useState('')

  const stripe = useStripe();
  const elements = useElements();

  

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
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
      console.log(error.message)
      setCardError(error.message)
    }else{
      setCardError('')
    }

    setSuccessMessage('')

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
        fetch("http://localhost:5000/payments",{
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
          setSuccessMessage("Your payment completed successfuly")
        }
      })
      }
  }

  return (
   <>
     <form onSubmit={handleSubmit}>
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
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    {
      cardError && <p className='text-red-600'>{cardError}</p>
    }
    {
       successMessage && <p>{successMessage}</p>
    }
   </>

  )
}

export default CheckoutForm