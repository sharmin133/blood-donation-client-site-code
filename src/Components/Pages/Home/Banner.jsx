import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Banner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      className="relative min-h-[600px] flex  justify-center items-center"
      style={{
        backgroundImage: "url('/Image/banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0  bg-opacity-60"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20  text-white  px-4"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Donate Blood, Save Lives
        </h1>

        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Join as a Donor
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/search")}
            className="bg-white hover:bg-gray-100 text-red-600 font-semibold py-3 px-6 rounded-full transition"
          >
            Search Donors
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
