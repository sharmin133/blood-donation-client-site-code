import React, { useState } from "react";

const EligibilityQuiz = () => {
   const questions = [
    { text: "Are you between 18–65 years old?", valid: "yes" },
    { text: "Do you weigh at least 50 kg?", valid: "yes" },
    { text: "Are you currently feeling healthy and well?", valid: "yes" },
    { text: "Have you donated blood in the last 3 months?", valid: "no" },
    { text: "Do you have any recent infections or illnesses?", valid: "no" },
    { text: "Do you have any chronic diseases (e.g. heart, diabetes)?", valid: "no" }, // extra card
    { text: "Have you had surgery in the last 6 months?", valid: "no" }, // extra card
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [eligible, setEligible] = useState(null);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentStep];

    if (
      (answer === "yes" && !currentQuestion.mustBeYes) ||
      (answer === "no" && currentQuestion.mustBeYes)
    ) {
      setEligible(false);
      setFinished(true);
      return;
    }

    if (currentStep === questions.length - 1) {
      setEligible(true);
      setFinished(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6 bg-gray-50 border rounded-lg shadow-md text-center">
      {!finished ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-red-600">
            Quick Eligibility Quiz
          </h3>
          <p className="text-gray-800 mb-6">{questions[currentStep].text}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleAnswer("yes")}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer("no")}
              className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              No
            </button>
          </div>
        </>
      ) : (
        <div className="mt-6">
          {eligible ? (
            <p className="text-green-600 font-bold text-lg">
              🎉 Congratulations! You are eligible to donate blood.
            </p>
          ) : (
            <p className="text-red-600 font-bold text-lg">
              ❌ Sorry, you are not eligible to donate blood.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EligibilityQuiz;
