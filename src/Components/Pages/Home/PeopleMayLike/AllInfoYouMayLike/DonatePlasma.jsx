import React from 'react';

const DonatePlasma = () => {
  return (
    <div className="container bg-white mx-auto  px-10 py-10 min-h-screen ">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Image */}
        <div>
          <img
            src="https://i.ibb.co.com/Kpb2twYh/red-blood-cells-3188223-640.jpg" 
            alt="Donate Plasma"
            className="rounded-2xl shadow-lg "
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl text-red-800 font-bold mb-4">What is plasma?</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Plasma is the largest part of your blood, making up about 55% of its overall content. 
            It carries water, salts, and enzymes. Plasma is crucial because it transports nutrients, 
            hormones, and proteins to the parts of the body that need them.
          </p>
        </div>
      </div>

      {/* Bottom Description */}
      <div className="mt-12 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-black mb-2">
            Why give plasma instead of blood?
          </h3>
          <p className="text-gray-800 text-lg leading-relaxed">
            Plasma donations help create life-saving therapies for people with rare and chronic diseases. 
            Unlike whole blood, plasma can be donated more frequently, making it an important resource 
            in medical treatments.
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-black font-semibold mb-2">
            How does giving plasma work?
          </h3>
          <p className="text-gray-800 text-lg leading-relaxed">
            The donation process is called plasmapheresis. Blood is drawn from your arm, plasma is separated 
            and collected, and the remaining components (like red blood cells) are returned to your body. 
            The process is safe, and donors are carefully monitored throughout.
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-black font-semibold mb-2">
            Who can benefit from plasma?
          </h3>
          <p className="text-gray-800 text-lg leading-relaxed">
            Plasma donations help patients with hemophilia, immune deficiencies, severe burns, 
            and trauma victims. Plasma therapy is vital for these life-saving treatments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonatePlasma;
