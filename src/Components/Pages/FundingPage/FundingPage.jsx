// src/pages/FundingPage.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_key);

const FundingPage = () => {
  return (
    <section className="bg-gradient-to-b from-red-50 to-red-100 min-h-screen px-4 py-16">
      <div className="max-w-xl mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </section>
  );
};

export default FundingPage;