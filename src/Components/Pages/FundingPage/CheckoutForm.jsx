import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useContext } from 'react'; 
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const { user } = useContext(AuthContext); 
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Create payment method
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (pmError) {
      setError(pmError.message);
      return;
    } else {
      setError('');
      console.log('[PaymentMethod]', paymentMethod);
    }

    const fundData = {
      userId: user?.uid,
      name: user?.displayName,
      email: user?.email,
      amount: parseInt(amount) * 100, // convert dollars to cents
      paymentMethodId: paymentMethod.id,
    };

    // Call backend to create payment intent
    const res = await fetch('http://localhost:3000/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(fundData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.error || 'Payment creation failed');
      return;
    }

    const data = await res.json();
    const clientSecret = data.clientSecret;

    // Confirm the payment with Stripe.js
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email || '',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      console.log('Payment confirmation error:', result.error.message);
    } else {
     if (result.paymentIntent.status === 'succeeded') {
  console.log('Payment Successful');

  // ✅ Save the fund info in your backend
  await fetch('http://localhost:3000/save-fund', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({
      userId: user?.uid,
      name: user?.displayName,
      amount: parseInt(amount) * 100,
    }),
  });

  // ✅ Show success alert
  Swal.fire({
    icon: 'success',
    title: 'Payment Successful!',
    text: 'Thank you for your donation.',
    confirmButtonText: 'OK',
  });

  setError('');
  setAmount('');
}

    }
  };

  return (
    <div className='bg-white p-4 rounded shadow-md max-w-md mx-auto'>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          placeholder='Enter amount'
          className='input input-bordered w-full mb-4'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="1"
        />

        <CardElement className='p-4 border rounded mb-4' />

        <button
          type='submit'
          disabled={!stripe }
          className='btn btn-primary bg-red-600 text-2xl w-full'
        >
          Pay
        </button>

        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
