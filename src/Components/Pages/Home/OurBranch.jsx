import React from 'react';
import { FaUserFriends, FaMapMarkerAlt, FaTint } from 'react-icons/fa';

const OurBranch = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-center">
      <div className="mb-6 text-3xl font-semibold text-gray-800 dark:text-gray-200">
        We’re a network of
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Donors */}
        <div className="flex flex-col items-center">
          <FaUserFriends className="text-red-600 text-5xl mb-3" />
         
          <p className="text-2xl font-semibold">855 Donors</p>
        </div>
        {/* Districts */}
        <div className="flex flex-col items-center">
          <FaMapMarkerAlt className="text-red-600 text-5xl mb-3" />
          
          <p className="text-2xl font-semibold">64 Districts</p>
        </div>
        {/* Blood Groups */}
        <div className="flex flex-col items-center">
          <FaTint className="text-red-600 text-5xl mb-3" />
        
          <p className=" text-2xl font-semibold">8 Blood Groups</p>
        </div>
      </div>
    </div>
  );
};

export default OurBranch;
