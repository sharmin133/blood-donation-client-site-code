import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // 60 random dots
  const dots = Array.from({ length: 80 }, () => ({
    left: 50 + Math.random() * 120, // % position
    size: 3 + Math.random() * 5,    // 3-8px
    color: ["#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"][Math.floor(Math.random() * 5)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2
  }));

  return (
    <section
      className="relative min-h-[200px] md:min-h-[550px] w-full flex justify-end items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/JFqb59f2/Chat-GPT-Image-Aug-20-2025-09-03-40-PM.png')",
        backgroundSize: "70% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated dots */}
      {dots.map((dot, idx) => (
        <span
          key={idx}
          className="absolute rounded-full"
          style={{
            top: "-10px",
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            animation: `drop-${idx} ${dot.duration}s linear infinite`,
            animationDelay: `${dot.delay}s`,
          }}
        ></span>
      ))}

      {/* Linear gradient overlay */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(to left, rgba(255,0,0,0.15), rgba(255,0,0,0))"
        }}
      ></div>

      {/* Text & buttons */}
      <div className="relative z-20 text-black px-4 text-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-6 md:pr-20">
          Donate Blood, <span className="block md:inline"> Save Lives</span>
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 flex-wrap">
          <Link to='/login'>
            <button className="bg-red-600 hover:bg-red-700 text-white md:font-semibold md:py-3 md:px-6 py-2 px-2 rounded-full transition w-auto">
              Join as a Donor
            </button>
          </Link>
          <Link to='/search'>
            <button className="bg-white border-2 hover:bg-gray-100 text-red-600 md:font-semibold md:py-3 md:px-6 py-1 px-2 rounded-full transition w-auto">
              Search Donors
            </button>
          </Link>
        </div>
      </div>

      {/* Tailwind custom keyframes for dots */}
      <style>
        {dots.map((dot, idx) => `
          @keyframes drop-${idx} {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(600px) rotate(360deg); opacity: 0; }
          }
        `).join('')}
      </style>
    </section>
  );
};

export default Banner;
