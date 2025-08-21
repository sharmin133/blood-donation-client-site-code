import React, { useEffect } from 'react';
import { FaUserFriends, FaMapMarkerAlt, FaTint } from 'react-icons/fa';
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurBranch = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('https://i.ibb.co.com/MkwKwd1r/Pink-and-Brown-Watercolor-Splotch-Monogram-Personal-Envelope.png')" 
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0"></div>

      <div className="relative max-w-4xl mx-auto py-16 px-4 text-center text-white">
        <h2 className="text-4xl md:text-4xl font-bold mb-3">We’re a network of</h2>

        {/* Framer Motion underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 1 }}
          className="h-1 bg-red-500 mx-auto mb-6 rounded-full"
        />

        {/* AOS-animated stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-6">
          {/* Donors */}
          <div className="flex flex-col items-center" data-aos="zoom-in">
            <FaUserFriends className="text-red-400 text-5xl mb-3" />
            <p className="text-2xl font-semibold">855 Donors</p>
          </div>

          {/* Districts */}
          <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="200">
            <FaMapMarkerAlt className="text-red-400 text-5xl mb-3" />
            <p className="text-2xl font-semibold">64 Districts</p>
          </div>

          {/* Blood Groups */}
          <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="400">
            <FaTint className="text-red-400 text-5xl mb-3" />
            <p className="text-2xl font-semibold">8 Blood Groups</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBranch;
