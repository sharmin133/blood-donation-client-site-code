import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-stars";

const ReviewAll = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; 

  useEffect(() => {
    axios
      .get("https://blood-donation-vert.vercel.app/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  // pagination calculation
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All User Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-red-50 dark:bg-red-700 text-black dark:text-white">
                  <th>User</th>
                  <th>Image</th>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.map((r) => (
                  <tr key={r._id} className="border-b">
                    <td>{r.userName}</td>
                    <td>
                      <img
                        src={r.photoURL}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td>{r.userEmail}</td>
                    <td>
                      <ReactStars
                        count={5}
                        size={20}
                        value={r.rating}
                        edit={false}
                        color2="#facc15"
                      />
                    </td>
                    <td>{r.review}</td>
                    <td>{new Date(r.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewAll;
