import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const YouMayAlsoLike = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      easing: "ease-in-out",
      once: true, // animation happens only once
    });
  }, []);

  return (
    <section className="bg-gradient-to-l from-red-100 via-red-200 px-4">
      <div className="max-w-7xl mx-auto py-10 text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-black mb-8"
          data-aos="fade-up"
        >
          You may also like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col h-full"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-2xl font-bold mb-2 text-black">
              Why donate plasma?
            </h3>
            <p className="text-gray-800 mb-4 text-lg flex-1">
              Learn why plasma donation is so important and how it saves lives.
            </p>
            <Link
              to="/why-donate-plasma"
              className="mt-auto w-full text-center px-4 py-3  text-red-700 font-bold border-2 border-red-700 rounded-lg hover:bg-red-200 transition"
            >
              How it's a game-changer
            </Link>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col h-full"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-2xl font-bold mb-2 text-black">
              Are you a rare type?
            </h3>
            <p className="text-gray-800 mb-4 text-lg flex-1">
              Find out how rare blood types are critical for saving lives.
            </p>
            <Link
              to="/rare-type"
              className="mt-auto w-full text-center px-4 py-3  text-red-700 font-bold border-2 border-red-700 rounded-lg hover:bg-red-200 transition"
            >
              Get in touch
            </Link>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col h-full"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-2xl font-bold mb-2 text-black">
              Can't donate blood?
            </h3>
            <p className="text-gray-800 mb-4 text-lg flex-1">
              Can’t donate blood? Explore other ways you can contribute.
            </p>
            <Link
              to="/other-ways-to-give"
              className="mt-auto w-full text-center px-4 py-3  text-red-700 font-bold border-2 border-red-700 rounded-lg hover:bg-red-200 transition"
            >
              Other ways to give
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
