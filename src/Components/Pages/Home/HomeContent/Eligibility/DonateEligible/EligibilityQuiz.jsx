import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTint, FaHandHoldingHeart, FaBan, FaRedo } from "react-icons/fa";

const EligibilityQuiz = () => {
  const questions = [
    { text: "Are you between 18–65 years old?", valid: "yes" },
    { text: "Do you weigh at least 50 kg?", valid: "yes" },
    { text: "Are you currently feeling healthy and well?", valid: "yes" },
    { text: "Have you donated blood in the last 3 months?", valid: "no" },
    { text: "Do you have any recent infections or illnesses?", valid: "no" },
    { text: "Do you have any chronic diseases (e.g. heart, diabetes)?", valid: "no" },
    { text: "Have you had surgery in the last 6 months?", valid: "no" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [eligible, setEligible] = useState(null);
  const [failedAt, setFailedAt] = useState(null);

  const progress = finished ? 100 : (currentStep / questions.length) * 100;

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentStep];

    if (answer !== currentQuestion.valid) {
      setEligible(false);
      setFailedAt(currentQuestion.text);
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

  const handleRestart = () => {
    setCurrentStep(0);
    setFinished(false);
    setEligible(null);
    setFailedAt(null);
  };

  return (
    <div className="max-w-lg mx-auto py-4">
      {/* Progress bar */}
      <div className="mb-8 px-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
            {finished ? "Complete" : `Question ${currentStep + 1} of ${questions.length}`}
          </span>
          <span className="text-xs font-medium text-gray-400">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden bg-gradient-to-br from-white via-red-50/60 to-red-100/50
                       border border-red-100 rounded-2xl shadow-sm p-8 text-center"
          >
            {/* decorative texture */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-red-200/40 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-red-300/30 rounded-full blur-2xl pointer-events-none" />
            <FaTint className="absolute top-4 right-5 text-red-200/60 text-3xl rotate-12 pointer-events-none" />

            <div className="relative w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700
                            flex items-center justify-center text-white font-bold text-xl mb-6 shadow-md">
              {currentStep + 1}
            </div>

            <p className="relative text-gray-900 text-lg md:text-xl font-semibold mb-8 leading-relaxed">
              {questions[currentStep].text}
            </p>

            <div className="relative flex justify-center gap-4">
              <motion.button
                onClick={() => handleAnswer("no")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex-1 max-w-[140px] px-6 py-3 bg-white border-2 border-gray-200 text-gray-700
                           font-semibold rounded-xl hover:border-red-300 hover:text-red-700 transition-colors cursor-pointer"
              >
                No
              </motion.button>
              <motion.button
                onClick={() => handleAnswer("yes")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex-1 max-w-[140px] px-6 py-3 bg-red-700 text-white
                           font-semibold rounded-xl shadow-md hover:bg-red-800 transition-colors cursor-pointer"
              >
                Yes
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative overflow-hidden rounded-2xl p-8 text-center border ${
              eligible
                ? "bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 border-emerald-200"
                : "bg-gradient-to-br from-red-50 via-white to-red-100/60 border-red-200"
            }`}
          >
            {/* decorative texture */}
            <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
              eligible ? "bg-emerald-200/40" : "bg-red-200/40"
            }`} />
            <div className={`absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-2xl pointer-events-none ${
              eligible ? "bg-emerald-300/30" : "bg-red-300/30"
            }`} />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              className={`relative w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-6 shadow-md ${
                eligible
                  ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white"
                  : "bg-gradient-to-br from-red-400 to-red-600 text-white"
              }`}
            >
              {eligible ? <FaHandHoldingHeart /> : <FaBan />}
            </motion.div>

            <h3 className={`relative text-2xl font-bold mb-3 ${eligible ? "text-emerald-700" : "text-red-700"}`}>
              {eligible ? "You're Eligible to Donate!" : "You're Not Eligible Right Now"}
            </h3>

            <p className="relative text-gray-600 leading-relaxed mb-8 max-w-sm mx-auto">
              {eligible
                ? "Great news — based on your answers, you meet the basic requirements to donate blood. Visit your nearest donation center to schedule a visit."
                : `Based on your answer to "${failedAt}", you don't currently meet the basic eligibility requirements. This may change over time — check with a medical professional if you're unsure.`}
            </p>

            <button
              onClick={handleRestart}
              className="relative inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200
                         text-gray-700 font-semibold rounded-xl hover:border-red-300 hover:text-red-700
                         transition-colors cursor-pointer"
            >
              <FaRedo className="text-sm" /> Retake Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EligibilityQuiz;