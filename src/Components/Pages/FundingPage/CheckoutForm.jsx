import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { FaHandHoldingHeart, FaLock } from 'react-icons/fa';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      fontFamily: 'inherit',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#dc2626' },
  },
};

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (pmError) {
      setError(pmError.message);
      setProcessing(false);
      return;
    } else {
      setError('');
      console.log('[PaymentMethod]', paymentMethod);
    }

    const fundData = {
      userId: user?.uid,
      name: user?.displayName,
      email: user?.email,
      amount: parseInt(amount) * 100,
      paymentMethodId: paymentMethod.id,
    };

    const res = await fetch('https://blood-donation-vert.vercel.app/create-payment', {
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
      setProcessing(false);
      return;
    }

    const data = await res.json();
    const clientSecret = data.clientSecret;

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
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment Successful');

        await fetch('https://blood-donation-vert.vercel.app/save-fund', {
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

        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Thank you for your donation.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#dc2626',
        });

        setError('');
        setAmount('');
      }
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Heading */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                          tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-red-200">
          <FaHandHoldingHeart className="text-red-500" /> Secure Donation
        </span>
        <h1 className="text-3xl font-bold text-gray-900">Make a Contribution</h1>
        <p className="text-gray-500 mt-1 text-sm">Every dollar helps save a life.</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-red-100 shadow-md bg-white p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">
              Donation Amount ($)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">
              Card Details
            </label>
            <div className="px-4 py-3.5 rounded-lg border border-red-100 bg-white
                             focus-within:ring-2 focus-within:ring-red-300 focus-within:border-red-400 transition">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700
                       disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-lg
                       px-6 py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            {processing ? 'Processing...' : (
              <>
                <FaLock className="text-sm" /> Pay ${amount || '0'}
              </>
            )}
          </button>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;