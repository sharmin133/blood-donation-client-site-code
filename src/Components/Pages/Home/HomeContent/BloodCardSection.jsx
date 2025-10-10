import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const BloodCardSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleCreateCard = () => {
    navigate("/create-card"); // go to card creation page
  };

  return (
    <div className="bg-gradient-to-r from-red-100 via-red-200 px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-around gap-8">
        {/* Text Section */}
        <motion.div
          className="text-center md:text-left md:max-w-lg"
          data-aos="fade-right"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            Blood Buddy Card
          </h2>
          <p className="text-gray-800 text-base md:text-lg mb-2">
            This card contains blood donation information. You can share it
            digitally or use it as a physical card when needed.
          </p>
          <p className="text-gray-800 text-xl mb-6">
            Download your card right now!
          </p>

          <motion.button
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={handleCreateCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Your Card
          </motion.button>
        </motion.div>

        {/* Example Card Preview */}
        <motion.div
          className="text-center mt-8 md:mt-0"
          data-aos="fade-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Example of Preview
          </h2>
          <motion.div
            className="w-72 md:w-96 p-4 bg-red-100 rounded-lg shadow mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="https://i.ibb.co.com/Vc5kgvwp/imm-1.png"
              alt="Example User"
              className="mx-auto w-24 h-24 rounded-full"
            />
            <h3 className="font-bold text-lg text-red-700 mt-2">Aarohi Zara</h3>
            <p className="text-black font-semibold">Blood Group: B+</p>
            <p className="text-black font-semibold">District: Naogaon</p>
            <p className="text-black font-semibold">Upazila: Naogaon</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BloodCardSection;
