import React, { useState } from 'react';
import { FaTint, FaSyringe, FaHeartbeat, FaHandsHelping } from 'react-icons/fa';

const BloodInfoCards = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const modalContent = {
    types: {
      title: 'About Blood Types',
      content: `There are more than 8 known blood types based on the ABO and Rh systems. 
Type O-negative is the universal donor, while AB-positive is the universal recipient. Knowing your blood type ensures compatibility and safety during blood transfusions. Blood type inheritance is also determined genetically.

In emergency cases, hospitals often rely on O-negative blood because it can be given to almost anyone. However, only about 7% of the population has it. Therefore, donors of rare blood types are always in high demand.`
    },
    components: {
      title: 'About Blood Components',
      content: `Blood contains four key components: red blood cells, white blood cells, platelets, and plasma. Each plays a critical role in patient care. For example, plasma contains clotting factors and proteins that are vital for burn victims and those with liver disease.

Component donation (like platelet or plasma donation) allows specific help for patients and is often used for cancer treatment, surgeries, and trauma care. This targeted donation helps medical teams treat patients more effectively.`
    },
    eligibility: {
      title: 'Donor Eligibility',
      content: `To donate blood, you must generally be between 18–65 years old, in good health, and meet a minimum weight requirement (typically 50 kg/110 lbs). You must not have had any recent infections, surgeries, or high-risk activities.

Before each donation, a mini health screening checks your hemoglobin, pulse, and blood pressure. If you're unsure, consult your local blood donation center. Remember, eligibility helps ensure both donor and recipient safety.`
    },
    process: {
      title: 'The Blood Donation Process',
      content: `Donating blood is a simple and safe process that takes about 30–45 minutes. It includes registration, a short medical screening, the donation itself (about 8–10 minutes), and a brief rest period with refreshments.

After donation, your body replaces the fluid in a few hours, and red blood cells in a few weeks. Most people feel fine and return to normal activities quickly. Regular donation (every 3–4 months) can save many lives each year.`
    }
  };

  const renderCard = (key, icon, title, summary, iconColor) => (
    <div key={key} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
     <div className='flex gap-3 justify-center pb-4'> <div className={`text-5xl  ${iconColor}`}>
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-red-600 mb-3">{title}</h2></div>
      <p className="text-gray-700 dark:text-gray-200 mb-4">{summary}</p>
      <button
        onClick={() => setSelectedCard(key)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Learn More
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {renderCard(
          'types',
          <FaTint />,
          'About Blood Types',
          'There are more than 8 blood types. Knowing yours is crucial for safe transfusion.',
          'text-blue-600'
        )}
        {renderCard(
          'components',
          <FaSyringe />,
          'About Blood Components',
          'Blood can be separated into red cells, plasma, and platelets to treat specific needs.',
          'text-green-600'
        )}
        {renderCard(
          'eligibility',
          <FaHeartbeat />,
          'Donor Eligibility',
          'Before donating, ensure you meet health, age, and weight requirements.',
          'text-pink-600'
        )}
        {renderCard(
          'process',
          <FaHandsHelping />,
          'Donation Process',
          'Learn how the simple and safe donation process works from start to finish.',
          'text-yellow-600'
        )}
      </div>

      {selectedCard && (
  <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-lg w-full relative z-50 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        {modalContent[selectedCard].title}
      </h2>
      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line mb-6">
        {modalContent[selectedCard].content}
      </p>
      <button
        onClick={() => setSelectedCard(null)}
        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default BloodInfoCards;
