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

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [latestReviews, setLatestReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Fetch latest 4 reviews
  useEffect(() => {
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
    fetchReviews();
  }, []);

  const handleOpenModal = () => {
    if (!user) {
      toast.error("Please login first to submit a review!");
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

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

      // Refresh reviews
      const res = await axios.get("https://blood-donation-vert.vercel.app/reviews");
      const sorted = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
      setLatestReviews(sorted);
    } catch (error) {
      toast.error("Something went wrong while submitting review!");
      console.error(error);
    }
  };

  return (
    <div className="py-10 px-4 bg-gray-50 mx-auto text-center">
      {/* Heading */}
      <h2
        className="text-3xl md:text-5xl font-bold text-black mb-6"
        data-aos="fade-up"
      >
        Voices That Inspire
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-12 mx-auto px-4 md:px-20">
        {/* Left Text & Button */}
        <div className="flex flex-col gap-6 max-w-sm" data-aos="fade-right">
          <p className="text-xl text-gray-800 mb-4">
            Hear from our blood buddies and share your own experience to inspire others. Your words can save lives!
          </p>
          <button
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={handleOpenModal}
          >
            Submit Your Opinion
          </button>
        </div>

        {/* Swiper Carousel */}
        <div className="w-full max-w-2xl" data-aos="fade-left">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
          >
            {latestReviews.map((rev) => (
              <SwiperSlide key={rev._id}>
                <div className="card bg-gradient-to-r from-red-100 to-red-300 max-w-lg mx-auto shadow-lg p-6 text-left h-64 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={rev.photoURL || "https://i.ibb.co.com/rfT9JS3N/img7.jpg"}
                        alt="user"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-black">{rev.userName}</h4>
                        <ReactStars
                          count={5}
                          size={20}
                          value={rev.rating}
                          edit={false}
                          color1="#ccc"
                          color2="#facc15"
                        />
                      </div>
                    </div>
                    <p className="text-gray-700 italic line-clamp-4">“{rev.review}”</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-red-100 w-1/2 max-w-sm  md:max-w-2xl p-6 rounded-lg">
            <h3 className="font-bold text-lg text-red-700 mb-4">Submit Your Review</h3>
            <div className="flex justify-center mb-4">
              <ReactStars
                count={5}
                size={40}
                value={rating}
                onChange={(newRating) => setRating(newRating)}
                color1="#ccc"
                color2="#facc15"
              />
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your detailed review..."
              className="textarea textarea-bordered w-full mb-4"
            ></textarea>
            <div className="flex justify-between">
              <button onClick={handleSubmit} className="btn btn-success">
                Submit
              </button>
              <button onClick={handleCloseModal} className="btn btn-error">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ReviewSection;
