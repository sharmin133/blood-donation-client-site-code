import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutForm = ({ name, email }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe has not loaded yet.');
      return;
    }

    setLoading(true);

    try {
      const card = elements.getElement(CardElement);
      if (!card) {
        toast.error('Card element not found');
        setLoading(false);
        return;
      }

      // 1. Create a PaymentMethod
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: {
          name,
          email,
        },
      });

      if (paymentMethodError) {
        toast.error(paymentMethodError.message);
        setLoading(false);
        return;
      }

    //   2. Send PaymentMethod.id to backend to create a PaymentIntent
      const { data } = await axios.post('http://localhost:3000/create-payment-intent', {
        payment_method_id: paymentMethod.id,
        name,
        email,
        amount: 1000, // amount in cents ($10)
      });

      const { clientSecret } = data;

      // 3. Confirm the payment on the client
      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmResult.error) {
        toast.error(confirmResult.error.message);
      } else if (confirmResult.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');

        // Save payment/funding info to your backend DB
        await axios.post('http://localhost:3000/fundings', {
          name,
          email,
          amount: 10, // in dollars
          date: new Date(),
          paymentIntentId: confirmResult.paymentIntent.id,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Payment failed');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn bg-red-600 text-white mt-4"
      >
        {loading ? 'Processing...' : 'Pay $10'}
      </button>
    </form>
  );
};

export default CheckoutForm;

