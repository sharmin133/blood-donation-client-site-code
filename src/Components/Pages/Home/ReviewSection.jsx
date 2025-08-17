import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-stars";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"; // ✅ use axios for API calls

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      rating,
      review,
      createdAt: new Date(),
    };

    try {
      await axios.post("https://blood-donation-vert.vercel.app/reviews", reviewData); // ✅ backend API
      toast.success("Thank you for your review! 💖");

      document.getElementById("review_modal").close();
      setRating(0);
      setReview("");
    } catch (error) {
      toast.error("Something went wrong while submitting review!");
      console.error(error);
    }
  };

  return (
    <div className="py-10 max-w-3xl mx-auto text-center">
      {/* Heading */}
      <h2 className="text-5xl font-bold text-black mb-4">Voices That Inspire</h2>
      <p className="text-lg text-gray-600 mb-6">
        Hear from our blood buddies and share your own experience to inspire
        others. Your words can save lives!
      </p>

      {/* Button */}
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Submit Your Opinion
      </button>

      {/* DaisyUI Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Submit Your Review</h3>

          {/* ⭐ Star Rating */}
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

          {/* Review Field */}
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your detailed review..."
            className="textarea textarea-bordered w-full mb-4"
          ></textarea>

          {/* Buttons */}
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
