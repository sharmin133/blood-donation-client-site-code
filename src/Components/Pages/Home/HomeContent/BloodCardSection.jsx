
 import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaIdCard, FaDownload, FaTint } from "react-icons/fa";

const BloodCardSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    // Load Montenegrin Gothic One display font for the heading (matches rest of site)
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleCreateCard = () => {
    navigate("/create-card");
  };

  return (
    <section className="relative bg-gradient-to-r from-red-100 via-red-200 px-4 md:px-12 py-20 overflow-hidden">

      <div className="absolute -top-10 -right-10 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0  bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-14">

        {/* Text Section */}
        <motion.div
          className="text-center md:text-left md:max-w-lg"
          data-aos="fade-right"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-red-200">
            <FaIdCard className="text-red-500" /> Your Digital Identity
          </span>

          <h2
            className="text-3xl md:text-5xl text-gray-900 uppercase leading-[0.95] mb-5"
            style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
          >
            Blood <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Buddy Card
            </span>
          </h2>

          <p className="text-gray-700 text-base md:text-lg mb-3 max-w-md mx-auto md:mx-0 leading-relaxed">
            This card holds your blood donation info in one place. Share it
            digitally, or keep it on you as a physical card for emergencies.
          </p>
          <p className="text-red-700 font-semibold text-lg mb-8">
            Download your card right now!
          </p>

          <motion.button
            className="inline-flex items-center gap-2 bg-red-700 text-white font-semibold
                       px-8 py-3.5 rounded-full shadow-lg hover:bg-red-800 transition-colors cursor-pointer"
            onClick={handleCreateCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="text-sm" /> Create Your Card
          </motion.button>
        </motion.div>

        {/* Example Card Preview */}
        <motion.div
          className="text-center"
          data-aos="fade-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
        <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-red-200 text-red-700 text-xs font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full shadow-sm mb-4">
  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
  Preview
</span>
          <motion.div
            className="relative w-72 md:w-80 rounded-2xl mx-auto overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Card header strip */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 px-5 py-4 flex items-center justify-between">
              <span className="text-white font-bold tracking-wide text-sm">RedHope</span>
              <FaTint className="text-red-200 text-lg" />
            </div>

            {/* Card body */}
            <div className="bg-white p-6 border border-t-0 border-red-100">
              <img
                src="https://i.ibb.co.com/Vc5kgvwp/imm-1.png"
                alt="Example User"
                className="mx-auto w-24 h-24 rounded-full object-cover border-4 border-red-100 shadow-md mb-4"
              />
              <h3 className="font-bold text-xl text-gray-900 mb-1">Aarohi Zara</h3>

              <span className="inline-block bg-red-700 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                B+
              </span>

              <div className="text-left text-sm text-gray-600 space-y-1.5 border-t border-red-100 pt-4">
                <p className="flex justify-between">
                  <span className="text-gray-400">District</span>
                  <span className="font-semibold text-gray-800">Naogaon</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Upazila</span>
                  <span className="font-semibold text-gray-800">Naogaon</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BloodCardSection;