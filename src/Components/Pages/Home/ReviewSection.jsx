import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-stars";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


// 👉 Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [latestReviews, setLatestReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ fetch latest 4 reviews
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
    document.getElementById("review_modal").showModal();
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

      document.getElementById("review_modal").close();
      setRating(0);
      setReview("");

      // refresh reviews
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
    <div className="py-10  mx-auto text-center">
      {/* Heading */}
      <h2 className="text-5xl font-bold text-black mb-4">Voices That Inspire</h2>
      <div className="flex flex-col md:flex-row justify-between gap-12 mx-auto px-4 md:px-20">
        <div><p className="text-lg text-gray-600 max-w-sm mb-6">
        Hear from our blood buddies and share your own experience to inspire others. 
        Your words can save lives!
      </p>

      {/* Button */}
      <button className="btn  mb-10" onClick={handleOpenModal}>
        Submit Your Opinion
      </button></div>

 {/* ✅ Carousel for latest 4 reviews */}
  <Swiper
  modules={[Autoplay, Pagination]} 
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  loop={true}
  slidesPerView={1}
  breakpoints={{
    768: { slidesPerView: 1 },
  }}
  spaceBetween={20}
  pagination={{ clickable: true }}  
   className="w-full max-w-lg"
>
        {latestReviews.map((rev) => (
          <SwiperSlide key={rev._id}>
            <div className="card bg-white max-w-lg mx-auto shadow-lg p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={rev.photoURL}
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
              <p className="text-gray-700 italic">“{rev.review}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

     
      {/* DaisyUI Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Submit Your Review</h3>
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
          <div className="modal-action flex justify-between">
            <button onClick={handleSubmit} className="btn btn-success">
              Submit
            </button>
            <form method="dialog">
              <button className="btn btn-error">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ReviewSection;
