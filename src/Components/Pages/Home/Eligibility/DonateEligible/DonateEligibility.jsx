import React, { useState } from "react";
import EligibilityQuiz from "./EligibilityQuiz";


const DonateEligibility = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleToggleQuiz = () => {
    setShowQuiz(!showQuiz);
  };

  return (
<div className="flex gap-3" >
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
      <h2 className="text-2xl md:text-5xl font-bold text-black mb-4">
        Can I donate?
      </h2>
      <p className="text-gray-700 mb-6">
        Find out if you are eligible to donate blood, plasma, or platelets today,
        or explore answers to our most frequently asked questions about donating.
      </p>

      <button
        onClick={handleToggleQuiz}
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Check your eligibility
      </button>

      {/* Modal */}
      {showQuiz && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
            {/* Close button */}
            <button
              onClick={handleToggleQuiz}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
            >
              ✖
            </button>

            <EligibilityQuiz />
          </div>
        </div>
      )}
    </div>

    <div>
      <img className="rounded-2xl" src="https://i.ibb.co.com/BVvgkQSN/doctor-9628974-640.jpg" alt="" />
    </div>
</div>
  );
};

export default DonateEligibility;
