import React from 'react';

const RareType = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Image */}
        <div>
          <img
            src="https://via.placeholder.com/500x300" // replace with a relevant image
            alt="Rare Blood Type"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-red-700">Are You a Rare Blood Type?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Some blood types are rarer than others, making it more challenging to find compatible donors in emergencies. 
            Knowing your blood type helps hospitals prepare for urgent needs.
          </p>
        </div>
      </div>

      {/* Bottom Description */}
      <div className="mt-12 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Importance of Rare Blood Types</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Rare blood types are critical in treating patients who require specific matches for transfusions. 
            Donors with rare types can save lives that might otherwise be at risk.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">How You Can Help</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            If you have a rare blood type, consider regular donations and register with blood banks. 
            Being proactive ensures that hospitals have access to these precious resources when needed.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">Stay Informed</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Stay updated about blood donation drives, rare type campaigns, and emergency appeals. 
            Your contribution can make a significant difference to patients in critical need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RareType;
