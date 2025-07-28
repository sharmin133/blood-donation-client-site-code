import React, { useEffect, useState } from 'react';
import { FaTint, FaSyringe, FaHeartbeat, FaHandsHelping } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';

const BloodInfoCards = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const cardData = {
    types: {
      title: 'About Blood Types',
      content: 'There are more than 8 blood types, including rare ones like AB-. Understanding compatibility helps save lives.',
      icon: <FaTint />,
      iconColor: 'text-blue-600',
    },
    components: {
      title: 'About Blood Components',
      content: 'Blood can be separated into red cells, plasma, and platelets—each with specific life-saving uses.',
      icon: <FaSyringe />,
      iconColor: 'text-green-600',
    },
    eligibility: {
      title: 'Donor Eligibility',
      content: 'Healthy individuals aged 18-65 and weighing 50kg+ can usually donate. Ensure proper rest and nutrition before donation.',
      icon: <FaHeartbeat />,
      iconColor: 'text-pink-600',
    },
    process: {
      title: 'Donation Process',
      content: 'The donation process includes registration, a health check, and donation. It typically takes 30–45 minutes.',
      icon: <FaHandsHelping />,
      iconColor: 'text-yellow-600',
    },
  };

  const renderCard = (key, { title, content, icon, iconColor }, delay) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      data-aos="fade-up"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center"
    >
      <div className="flex gap-3 justify-center pb-4">
        <div className={`text-5xl ${iconColor}`}>{icon}</div>
        <h2 className="text-2xl md:text-3xl font-bold text-red-600">{title}</h2>
      </div>
      <p className="text-gray-700 dark:text-gray-200 mb-4">
        {content.length > 100 ? content.slice(0, 100) + '...' : content}
      </p>
      <button
        onClick={() => setSelectedCard(key)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Learn More
      </button>
    </motion.div>
  );

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-12">
        Learn About Blood Donation
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(cardData).map(([key, value], index) =>
          renderCard(key, value, index * 0.2)
        )}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-xl max-w-lg w-full relative z-50 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 text-red-600">
                {cardData[selectedCard]?.title}
              </h2>
              <p>{cardData[selectedCard]?.content}</p>
              <button
                className="absolute top-3 right-3 text-red-500 text-xl font-bold hover:text-red-700"
                onClick={() => setSelectedCard(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BloodInfoCards;
