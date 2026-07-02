import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-stars";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Animation Imports
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaTimes, FaHeart, FaTint } from "react-icons/fa";

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [latestReviews, setLatestReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("https://blood-donation-vert.vercel.app/reviews");
      const sorted = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
      setLatestReviews(sorted);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    if (!user) {
      toast.error("Please login first to submit a review!");
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!rating || !review) {
      toast.error("Please fill all fields (review & rating)!");
      return;
    }

    const reviewData = {
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email,
      photoURL: user?.photoURL,
      rating,
      review,
      createdAt: new Date(),
    };

    try {
      await axios.post("https://blood-donation-vert.vercel.app/reviews", reviewData);
      toast.success("Thank you for your review! 💖");
      setRating(0);
      setReview("");
      handleCloseModal();
      fetchReviews();
    } catch (error) {
      toast.error("Something went wrong while submitting review!");
      console.error(error);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-red-100 px-4 md:px-12 py-24 overflow-hidden">

      {/* extra radial depth layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(220,38,38,0.09), transparent 40%), radial-gradient(circle at 85% 75%, rgba(220,38,38,0.10), transparent 45%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.9), transparent 60%)",
        }}
      />

      {/* top wave divider */}
      <svg
        className="absolute top-0 left-0 w-full h-16 md:h-24 text-white"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,40 C360,110 1080,-30 1440,40 L1440,0 L0,0 Z" />
      </svg>

      {/* dotted texture */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          opacity: 0.06,
        }}
      />

      {/* asymmetric soft blobs for depth */}
      <div className="absolute -top-24 -left-24 w-[26rem] h-[26rem] bg-red-100 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-red-200/50 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-red-50 rounded-full blur-[90px] pointer-events-none" />

      {/* faint oversized watermark drop */}
      <FaTint className="hidden md:block absolute top-10 right-10 text-red-50 text-[14rem] rotate-12 pointer-events-none" />

      {/* Heading — matches BloodInfoCards style, no badge here */}
      <div className="relative text-center mx-auto mb-14" data-aos="fade-up">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72
                        bg-red-200/30 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-300" />
          <FaTint className="text-red-600 text-sm" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-300" />
        </div>

        <h2
          className="relative text-3xl md:text-5xl text-red-800 uppercase leading-[0.95] mb-4"
          style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
        >
          Voices That <span className="bg-gradient-to-r from-red-700 to-gray-900 bg-clip-text text-transparent">Inspire</span>
        </h2>
        <p className="relative text-gray-600 mt-3 text-base sm:text-lg max-w-2xl mx-auto">
          Real words from real donors — hear their stories, or share your own.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 max-w-7xl mx-auto">
        {/* Left Text & Button */}
        <div className="flex flex-col gap-6 max-w-xl text-center md:text-left" data-aos="fade-right">
          <p className="text-lg text-gray-700 leading-relaxed">
            Hear from our blood buddies and share your own experience to
            inspire others. Your words can save lives.
          </p>
          <motion.button
            className="inline-flex items-center justify-center gap-2 bg-red-700 text-white font-semibold
                       px-8 py-3.5 rounded-full shadow-lg hover:bg-red-800 transition-colors cursor-pointer
                       w-fit mx-auto md:mx-0"
            onClick={handleOpenModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Your Opinion →
          </motion.button>
        </div>

        {/* Swiper Carousel */}
        <div className="w-full max-w-lg" data-aos="fade-left">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={latestReviews.length > 1}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {latestReviews.map((rev) => (
              <SwiperSlide key={rev._id}>
                <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl
                                border border-red-100 overflow-hidden
                                p-8 text-left h-72 flex flex-col justify-between
                                transition-all duration-500 hover:-translate-y-1">

                  {/* diagonal accent corner */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-red-600 to-red-800
                                  rotate-45 opacity-90" />
                  <FaQuoteLeft className="absolute top-4 right-4 text-white text-lg z-10" />

                  {/* big watermark quote */}
                  <FaQuoteLeft className="absolute -bottom-4 -left-2 text-red-50 text-[7rem] pointer-events-none" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-800 p-[2px]">
                          <img
                            src={rev.photoURL || "https://i.ibb.co.com/rfT9JS3N/img7.jpg"}
                            alt="user"
                            className="w-full h-full rounded-full object-cover border-2 border-white"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 leading-tight">{rev.userName}</h4>
                        <div className="inline-flex items-center gap-1 mt-1">
                          <ReactStars
                            count={5}
                            size={15}
                            value={rev.rating}
                            edit={false}
                            color1="#e5e7eb"
                            color2="#dc2626"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="relative text-gray-700 leading-relaxed line-clamp-4 z-10">
                      {rev.review}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-full max-w-md md:max-w-lg bg-white
                         border border-red-100 rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* header band */}
              <div className="relative bg-gradient-to-br from-red-600 to-red-800 px-7 pt-7 pb-12 text-center overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -top-10 -right-6 w-28 h-28 bg-white/10 rounded-full" />

                <button
                  onClick={handleCloseModal}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full
                             text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
                >
                  <FaTimes />
                </button>

                <div className="relative w-14 h-14 mx-auto rounded-full bg-white/15 border border-white/30
                                flex items-center justify-center text-white text-2xl mb-3">
                  <FaHeart />
                </div>
                <h3 className="relative text-xl font-bold text-white">Share Your Story</h3>
                <p className="relative text-red-100 text-sm mt-1">
                  Your experience could encourage someone else to donate.
                </p>
              </div>

              {/* body, overlapping the header */}
              <div className="relative px-7 pb-7 -mt-6">
                <div className="bg-white rounded-2xl shadow-lg border border-red-50 p-5">
                  <div className="flex flex-col items-center mb-5">
                    <ReactStars
                      count={5}
                      size={40}
                      value={rating}
                      onChange={(newRating) => setRating(newRating)}
                      color1="#e5e7eb"
                      color2="#dc2626"
                    />
                    <span className="text-sm font-semibold text-red-700 mt-1 h-5">
                      {ratingLabels[rating]}
                    </span>
                  </div>

                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your detailed review..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-red-50/30 text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400
                               transition resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700
                               font-semibold rounded-xl hover:border-red-300 hover:text-red-700
                               transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold
                               rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="top-center" autoClose={3000} />

      {/* bottom wave divider */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-24 text-white"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,60 C360,-10 1080,130 1440,60 L1440,100 L0,100 Z" />
      </svg>
    </section>
  );
};

export default ReviewSection;