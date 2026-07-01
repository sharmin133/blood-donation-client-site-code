import React, { useState, useEffect } from "react";
import EligibilityQuiz from "./EligibilityQuiz";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaTint, FaTimes, FaClock } from "react-icons/fa";

const DonateEligibility = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    // Load Montenegrin Gothic One display font for the heading
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = showQuiz ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showQuiz]);

  const handleToggleQuiz = () => {
    setShowQuiz(!showQuiz);
  };

  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-red-100 px-4 md:px-12 py-24 overflow-hidden">

      {/* top wave divider */}
      <svg
        className="absolute top-0 left-0 w-full h-16 md:h-24 text-white"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,40 C360,110 1080,-30 1440,40 L1440,0 L0,0 Z" />
      </svg>

      {/* multi-point radial depth layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 25%, rgba(220,38,38,0.09), transparent 40%), radial-gradient(circle at 88% 70%, rgba(220,38,38,0.10), transparent 45%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.9), transparent 60%)",
        }}
      />

      {/* asymmetric soft blobs for depth */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-red-200/30 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-200/30 rounded-full blur-[100px] pointer-events-none" />

      {/* faint oversized watermark drop */}
      <FaTint className="hidden md:block absolute bottom-6 left-6 text-red-50 text-[10rem] -rotate-12 pointer-events-none" />

      <div
        className="relative max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12"
        data-aos="fade-up"
      >
        {/* Text & Button */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-red-200">
            <FaClock className="text-red-500" /> 60-Second Check
          </span>

          <h2
            className="text-3xl md:text-5xl text-gray-900 uppercase leading-[0.95] mb-5"
            style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
          >
            Can I <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Donate?
            </span>
          </h2>

          <p className="text-gray-700 text-base md:text-lg mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Find out if you're eligible to donate blood, plasma, or platelets today,
            or explore answers to our most frequently asked questions about donating.
          </p>

          <motion.button
            onClick={handleToggleQuiz}
            className="bg-red-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg
                       hover:bg-red-800 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Check Your Eligibility →
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-3 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl rotate-2 opacity-20" />
          <img
            className="relative rounded-3xl w-full h-auto object-cover shadow-2xl border-4 border-white"
            src="https://i.ibb.co/BVvgkQSN/doctor-9628974-640.jpg"
            alt="Doctor"
          />
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleToggleQuiz}
          >
            <motion.div
              className="rounded-2xl shadow-2xl md:w-full md:max-w-4xl relative p-4 md:p-6
                         bg-gradient-to-br from-white via-red-50/40 to-red-100/50 border border-red-100 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* decorative glow */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={handleToggleQuiz}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full
                           text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer z-10"
              >
                <FaTimes />
              </button>

              <div className="relative">
                <EligibilityQuiz />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* bottom wave divider */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-24 text-white"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,60 C360,-10 1080,130 1440,60 L1440,100 L0,100 Z" />
      </svg>
    </section>
  );
};

export default DonateEligibility;