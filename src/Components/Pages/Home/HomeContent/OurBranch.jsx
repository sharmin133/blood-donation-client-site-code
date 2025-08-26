import React, { useEffect } from 'react';
import { FaUserFriends, FaMapMarkerAlt, FaTint } from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css';

const OurBranch = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div 
      className="bg-gradient-to-r from-red-100 via-red-200 px-4 text-center"
    
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0"></div>

      <div className="relative max-w-4xl mx-auto py-8 px-4 text-center text-black">
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">We’re a network of</h2>

        {/* Framer Motion underline */}
        <div
          
        />

        {/* AOS-animated stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-6">
          {/* Donors */}
          <div className="flex flex-col items-center" data-aos="zoom-in">
            <FaUserFriends className="text-blue-600 text-5xl mb-3" />
            <p className="text-2xl font-semibold">855 Donors</p>
          </div>

          {/* Districts */}
          <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="200">
            <FaMapMarkerAlt className="text-green-600 text-5xl mb-3" />
            <p className="text-2xl font-semibold">64 Districts</p>
          </div>

          {/* Blood Groups */}
          <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="400">
            <FaTint className="text-red-500 text-5xl mb-3" />
            <p className="text-2xl font-semibold">8 Blood Groups</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBranch;
