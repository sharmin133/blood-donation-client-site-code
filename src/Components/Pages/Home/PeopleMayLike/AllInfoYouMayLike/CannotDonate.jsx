import React from 'react';

const CannotDonate = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Image */}
        <div>
          <img
            src="https://via.placeholder.com/500x300" // replace with a relevant image
            alt="Cannot Donate"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-red-700">Why You Might Not Be Eligible</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Some individuals may not be eligible to donate blood, plasma, or platelets due to health, 
            recent medical procedures, or travel history. This ensures the safety of both donors and recipients.
          </p>
        </div>
      </div>

      {/* Bottom Description */}
      <div className="mt-12 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Temporary Restrictions</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            You might be temporarily deferred if you are feeling unwell, have a cold, flu, or have recently undergone surgery. 
            Once you recover, you can donate again.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">Permanent Restrictions</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Certain medical conditions, chronic illnesses, or medications may permanently prevent someone from donating. 
            It is important to check eligibility guidelines before attempting to donate.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">Other Considerations</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Recent travel to areas with certain infectious diseases, tattoos or piercings within a specific timeframe, 
            and certain lifestyle factors may also affect eligibility. Always consult with donation staff if unsure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CannotDonate;
