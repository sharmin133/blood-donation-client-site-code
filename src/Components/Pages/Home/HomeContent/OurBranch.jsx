import React, { useEffect } from "react";
import CountUp from "react-countup";
import {
  FaUserFriends,
  FaMapMarkerAlt,
  FaTint,
} from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  {
    number: 855,
    suffix: "+",
    title: "Active Donors",
    icon: FaUserFriends,
    color: "from-red-500 to-red-700",
  },
  {
    number: 64,
    suffix: "",
    title: "Districts",
    icon: FaMapMarkerAlt,
    color: "from-red-400 to-red-600",
  },
  {
    number: 8,
    suffix: "",
    title: "Blood Groups",
    icon: FaTint,
    color: "from-red-600 to-red-800",
  },
];

const OurBranch = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  return (
    <section className="relative overflow-hidden py-24 bg-white">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50 via-white to-red-100"></div>

      {/* Blur circles */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute w-96 h-96 rounded-full bg-red-300/20 blur-3xl -top-28 -left-24"
      />

      <motion.div
        animate={{
          y: [0, 50, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute w-[420px] h-[420px] rounded-full bg-red-400/20 blur-3xl bottom-0 right-0"
      />

      {/* small circles */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute w-24 h-24 rounded-full bg-red-300/20 blur-xl top-32 right-32"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute w-16 h-16 rounded-full bg-red-400/20 blur-lg bottom-24 left-40"
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20" data-aos="fade-up">
  <p className="uppercase tracking-[7px] text-red-600 font-bold mb-4">
    OUR COMMUNITY
  </p>

  <h2
    className="text-3xl md:text-5xl uppercase leading-[0.95] text-gray-900"
    style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
  >
    Saving Lives
    {' '}
    <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
      Together
    </span>
  </h2>

  
</div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                transition={{
                  duration: .3,
                }}
                data-aos="zoom-in"
                data-aos-delay={index * 150}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-red-100 p-10"
              >
                {/* top gradient */}
                <div
                  className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.color}`}
                ></div>

                {/* Icon */}

                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color}
                  flex items-center justify-center text-white text-3xl shadow-lg mx-auto mb-8
                  group-hover:rotate-6 transition`}
                >
                  <Icon />
                </div>

                {/* Number */}

                <h3 className="text-6xl font-black text-gray-900 text-center">
                  <CountUp
                    end={item.number}
                    duration={3}
                  />
                  {item.suffix}
                </h3>

                <p className="text-center mt-4 text-gray-500 font-medium text-lg">
                  {item.title}
                </p>

                {/* bottom glow */}

                <div
                  className={`absolute -bottom-20 left-1/2 -translate-x-1/2
                  w-56 h-56 rounded-full blur-3xl opacity-0
                  group-hover:opacity-30 transition bg-gradient-to-r ${item.color}`}
                ></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurBranch;