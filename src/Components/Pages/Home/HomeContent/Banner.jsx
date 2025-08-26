

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router";

const Banner = () => {


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
<section
  className="relative min-h-[200px] md:min-h-[550px] w-full flex justify-end items-center"
  style={{
    backgroundImage:
      "url('https://i.ibb.co.com/JFqb59f2/Chat-GPT-Image-Aug-20-2025-09-03-40-PM.png')",
    backgroundSize: "70% 100%", 
   
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0  bg-opacity-60"></div>

  <div className="relative z-20 text-black px-4 text-center">
    <h1 className="text-2xl md:text-5xl font-bold mb-6 md:pr-20">
  Donate Blood,
  <span className="block md:inline"> Save Lives</span>
</h1>
<div className="flex  flex-col md:flex-row justify-center gap-2 md:gap-4 flex-wrap">
    <Link to='/login'>
    
      <button className="bg-red-600 hover:bg-red-700 text-white md:font-semibold md:py-3 md:px-6 py-2 px-2 rounded-full transition w-auto">
        Join as a Donor
      </button></Link>
     <Link to='/search'>
      <button className="bg-white border-2 hover:bg-gray-100 text-red-600 md:font-semibold md:py-3 md:px-6 py-1 px-2 rounded-full transition w-auto">
        Search Donors
      </button></Link>
    </div>
  </div>
</section>



  );
};

export default Banner;
