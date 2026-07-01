import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaTint, FaSyringe, FaHeartbeat, FaHandsHelping, FaGift, FaLightbulb, FaTimes } from 'react-icons/fa';

const BloodInfoCards = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });

    // Load a distinctive display font for the section heading
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selectedCard ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedCard]);

  const modalContent = {
    types: {
      title: 'About Blood Types',
      content: `There are 8 main blood types, grouped by the ABO and Rh systems. O-negative is the universal donor — it can go to almost anyone in an emergency. AB-positive is the universal recipient, able to receive any type. Your blood type is inherited, and knowing it is essential for safe transfusions.

Only about 7% of people are O-negative, yet hospitals rely on it constantly for emergencies where there's no time to test a patient's type. That's why O-negative donors are always in especially high demand.`
    },
    components: {
      title: 'About Blood Components',
      content: `Whole blood is made of four parts: red cells, white cells, platelets, and plasma — each with its own job. Plasma alone carries the clotting factors and proteins that burn victims and liver patients depend on.

Donating a single component, like platelets or plasma, lets your donation go further. Separated components treat cancer patients, surgery cases, and trauma victims more precisely than whole blood alone, and you can often donate components more frequently.`
    },
    eligibility: {
      title: 'Donor Eligibility',
      content: `Most donors are 18–65 years old, in good general health, and at least 50 kg (110 lbs). Recent infections, surgeries, tattoos, or certain travel history can mean a short waiting period before you're eligible again.

Every visit starts with a quick screening — hemoglobin, pulse, and blood pressure — to protect both you and the patient receiving your donation. Unsure if you qualify? Your local blood center can check in minutes.`
    },
    process: {
      title: 'The Blood Donation Process',
      content: `The whole visit takes 30–45 minutes, but the actual draw is just 8–10 minutes. It goes: quick registration, a short health check, the donation itself, then a few minutes to rest with a snack and juice.

Your body replaces the fluid within hours and the red cells within a few weeks. Most donors are back to normal activity the same day. Donate every 3–4 months and you could help save dozens of lives a year.`
    },
    benefits: {
      title: 'Benefits of Blood Donation',
      content: `Giving blood isn't one-directional. The process can support cardiovascular health and helps regulate iron levels in the body, while prompting your bone marrow to produce fresh blood cells.

Beyond the physical, most donors describe a real sense of purpose — a tangible, 45-minute action that directly reaches someone in a hospital bed the same week.`
    },
    tips: {
      title: 'Blood Donation Tips',
      content: `A little preparation makes donation day easier:

• Eat a solid, iron-rich meal beforehand — skip anything greasy.
• Hydrate well, before and after.
• Sleep well the night before.
• Wear sleeves you can roll up past the elbow.
• Breathe slowly and stay relaxed during the draw.
• Skip heavy lifting or intense workouts for a few hours after.
• Take the offered snack and juice — don't rush out.

Small habits like these keep the experience smooth and make it easier to come back next time.`
    }
  };

  const cards = [
    { key: 'types', icon: <FaTint />, title: 'Blood Types', summary: 'Eight types, one universal donor. Learn what makes O-negative so critical.', color: 'from-blue-500 to-blue-600', tint: 'from-white to-blue-50' },
    { key: 'components', icon: <FaSyringe />, title: 'Blood Components', summary: 'Red cells, plasma, and platelets — split apart, they treat more patients.', color: 'from-emerald-500 to-emerald-600', tint: 'from-white to-emerald-50' },
    { key: 'eligibility', icon: <FaHeartbeat />, title: 'Donor Eligibility', summary: 'Age, weight, and health basics to check before you book a donation.', color: 'from-pink-500 to-pink-600', tint: 'from-white to-pink-50' },
    { key: 'process', icon: <FaHandsHelping />, title: 'Donation Process', summary: 'From check-in to juice box — what actually happens in 30 minutes.', color: 'from-amber-500 to-amber-600', tint: 'from-white to-amber-50' },
    { key: 'benefits', icon: <FaGift />, title: 'Benefits of Donation', summary: 'Donating gives back too — for your heart, your cells, and your sense of purpose.', color: 'from-purple-500 to-purple-600', tint: 'from-white to-purple-50' },
    { key: 'tips', icon: <FaLightbulb />, title: 'Donation Tips', summary: 'Small habits that make donation day easy and comfortable.', color: 'from-orange-500 to-orange-600', tint: 'from-white to-orange-50' },
  ];

  return (
    <section className="relative bg-gradient-to-b from-red-50 to-red-100 px-4 md:px-12 py-20">
      {/* Section heading */}
      <div className="text-center  mx-auto mb-14" data-aos="fade-up">
        <span className="inline-flex items-center gap-2 bg-red-700 text-white text-xs font-semibold
                                 tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 shadow-md">
                 <FaTint className="text-red-200" /> Know Before You Donate
               </span>
        <h2
          className="text-3xl md:text-5xl text-red-800 uppercase leading-[0.95] mb-4"
          style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
        >
          Everything About {' '}
          <span className="text-gray-900">Blood Donation</span>
        </h2>

        <p className="text-gray-600 mt-3 text-base sm:text-lg">
          Quick, practical answers on types, eligibility, and the donation process itself.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cards.map(({ key, icon, title, summary, color, tint }, i) => (
          <div
            key={key}
            className={`group relative bg-gradient-to-br ${tint} rounded-2xl shadow-md hover:shadow-2xl
                       border border-white/60 overflow-hidden
                       p-7 flex flex-col justify-between text-center h-full
                       transition-all duration-300 hover:-translate-y-1.5`}
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            {/* top accent bar */}
            <span className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color}`} />

            {/* faint decorative glow */}
            <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br ${color} opacity-[0.08] blur-2xl`} />

            <div className="relative">
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${color}
                                flex items-center justify-center text-white text-2xl
                                shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-700 text-base leading-relaxed mb-6">{summary}</p>
            </div>

            <button
              onClick={() => setSelectedCard(key)}
              className="relative text-red-700 font-semibold hover:text-red-800 hover:underline
                         underline-offset-4 cursor-pointer w-fit mx-auto transition-colors"
            >
              Learn more →
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 px-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white p-7 sm:p-8 rounded-2xl max-w-md w-full relative shadow-2xl border border-red-100"
            data-aos="zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full
                         text-gray-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-red-700 pr-8">
              {modalContent[selectedCard].title}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-6">
              {modalContent[selectedCard].content}
            </p>

            <button
              onClick={() => setSelectedCard(null)}
              className="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2.5 rounded-lg w-full transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BloodInfoCards;