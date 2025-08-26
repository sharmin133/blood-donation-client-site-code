import React, { useState, useEffect } from "react";
import EligibilityQuiz from "./EligibilityQuiz";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";

const DonateEligibility = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleToggleQuiz = () => {
    setShowQuiz(!showQuiz);
  };

  return (
    <div className="px-4 md:px-12 py-10">
      <div
        className=" mx-auto flex flex-col-reverse md:flex-row items-center gap-8"
        data-aos="fade-up"
      >
        {/* Text & Button */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            Can I donate?
          </h2>
          <p className="text-gray-800 text-base md:text-lg mb-6">
            Find out if you are eligible to donate blood, plasma, or platelets today,
            or explore answers to our most frequently asked questions about donating.
          </p>

          <motion.button
            onClick={handleToggleQuiz}
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Check your Eligibility
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            className="rounded-2xl w-full h-auto object-cover"
            src="https://i.ibb.co/BVvgkQSN/doctor-9628974-640.jpg"
            alt="Doctor"
          />
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-lg shadow-lg md:w-full md:max-w-4xl relative p-4 md:p-6 bg-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button
                onClick={handleToggleQuiz}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
              >
                ✖
              </button>

              <EligibilityQuiz />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonateEligibility;
