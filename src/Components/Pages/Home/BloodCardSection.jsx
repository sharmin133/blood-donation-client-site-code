import React from "react";
import { useNavigate } from "react-router";

const BloodCardSection = () => {
  const navigate = useNavigate();

  const handleCreateCard = () => {
    navigate("/create-card"); // go to card creation page
  };

  return (
    <div className=" bg-red-50">
      <div className="flex justify-around gap-3">

        <div className="  px-4 ">
        <h2 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
          Blood Buddy Card
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Download your card right now!
        </p>

        <button
          className="btn btn-primary mb-12"
          onClick={handleCreateCard}
        >
          Create Your Card
        </button>
</div>
       
        {/* Example Card Preview */}
        <div className="mt-8 flex justify-center">
          <div className="w-96 p-4 bg-white rounded-lg shadow text-center">
            <img
              src="https://i.ibb.co.com/rfT9JS3N/img7.jpg"
              alt="Example User"
              className="mx-auto w-24 h-24 rounded-full"
            />
            <h3 className="font-bold text-lg">John Doe</h3>
            <p className="text-red-700 font-semibold">Blood Group: A+</p>
            <p className="text-red-700 font-semibold" >District: Dhaka</p>
            <p className="text-red-700 font-semibold">Upazila: Dhanmondi</p>
          </div>
        </div>
      </div>

        <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              How to Create Your Card?
            </h3>
            <p className="text-gray-700">
              1. Fill in your personal information. <br />
              2. Add your blood group and other necessary details. <br />
              3. Download or print your card.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              How to Use Your Card?
            </h3>
            <p className="text-gray-700">
              This card contains blood donation information. 
              You can share it digitally or use it as a physical card when needed.
            </p>
          </div>
        </div>
      </div>
    
  );
};

export default BloodCardSection;
