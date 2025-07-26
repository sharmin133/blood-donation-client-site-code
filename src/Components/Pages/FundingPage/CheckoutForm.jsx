import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = () => {
  const stripe= useStripe();
  const elements= useElements()
const[error, setError]=useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!stripe || !elements){
      return
    }


    const card= elements.getElement(CardElement)
    if(!card){
      return
    }


    const {error,paymentMethod}=await stripe.createPaymentMethod({
      type:'card',
      card
    })

     if (error) {
    setError(error.message)
    } else {
      setError('');
      console.log('[PaymentMethod]', paymentMethod);
    }
   
  }  

  return (
    <div className='bg-white'>
      <form onSubmit={handleSubmit} >
       
<CardElement className='p-8'>

  
</CardElement  >
<button type='submit' disabled={!stripe} className='btn btn-primary btn-block text-center p-4' >Pay </button>
{
  error && <p className='text-red-500' >{error}</p>
}
      </form>
    </div>
  );
};

export default CheckoutForm;

