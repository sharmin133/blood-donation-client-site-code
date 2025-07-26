// src/pages/FundingPage.jsx

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const FundingPage = () => {


  return (
    <div className="max-w-md mx-auto p-6 pt-20">
    

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default FundingPage;
