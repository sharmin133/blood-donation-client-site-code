// src/pages/FundingPage.jsx

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe(import.meta.env.VITE_Payment_key);

const FundingPage = () => {


  return (
    <div className="max-w-md min-h-screen mx-auto p-6 pt-20">
    

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default FundingPage;
