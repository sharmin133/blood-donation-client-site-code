import React from "react";
import { Link } from "react-router";

const YouMayAlsoLike = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          You may also like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2 text-black">Why donate plasma?</h3>
            <p className="text-gray-600 mb-4">
              Learn why plasma donation is so important and how it saves lives.
            </p>
            <Link
              to="/why-donate-plasma"
              className="mt-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
             How it's a game-changer
            </Link>
          </div>


          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2 text-black ">Are you a rare type?</h3>
            <p className="text-gray-600 mb-4">
              Find out how rare blood types are critical for saving lives.
            </p>
            <Link
              to="/rare-type"
              className="mt-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Get in touch
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2 text-black ">Can't donate blood, plasma or platelets?</h3>
            <p className="text-gray-600 mb-4">
              Can’t donate blood? Explore other ways you can contribute.
            </p>
            <Link
              to="/other-ways-to-give"
              className="mt-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
