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
  className="relative min-h-[550px] w-full flex justify-end items-center"
  style={{
    backgroundImage:
      "url('https://i.ibb.co.com/JFqb59f2/Chat-GPT-Image-Aug-20-2025-09-03-40-PM.png')",
    backgroundSize: "70% 100%", 
   
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0  bg-opacity-60"></div>

  <div className="relative z-20 text-black px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-6 pr-20">
      Donate Blood, Save Lives
    </h1>
    <div className="flex justify-center gap-4 flex-wrap">
      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition">
        Join as a Donor
      </button>
      <button className="bg-white border-2 hover:bg-gray-100 text-red-600 font-semibold py-3 px-6 rounded-full transition">
        Search Donors
      </button>
    </div>
  </div>
</section>



  );
};

export default Banner;
