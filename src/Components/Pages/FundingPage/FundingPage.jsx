// src/pages/FundingPage.jsx
import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../context/AuthContext';
import CheckoutForm from '../../components/CheckoutForm';

const stripePromise = loadStripe('your_public_stripe_key_here');

const FundingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto p-6 pt-20">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Give Fund</h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm name={user.displayName} email={user.email} />
      </Elements>
    </div>
  );
};

export default FundingPage;
