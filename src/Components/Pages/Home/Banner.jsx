import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-[600px] flex md:p-20 justify-center"
      style={{
        backgroundImage: "url('/Image/banner.png')", 
        backgroundSize: "cover",            
        backgroundPosition: "center",          
      }}
    >
      <div className="absolute inset-0  bg-opacity-60"></div>

      <div className="relative z-20 text-center text-white max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Donate Blood, Save Lives
        </h1>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/register")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Join as a Donor
          </button>
          <button
            onClick={() => navigate("/search")}
            className="bg-white hover:bg-gray-100 text-red-600 font-semibold py-3 px-6 rounded-full transition"
          >
            Search Donors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;


