import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-stars";
import { FaCommentDots } from "react-icons/fa";
import Pagination from '../../../Pagination/Pagination';

const ReviewAll = () => {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(7);
  const batchSize = 7;

  useEffect(() => {
    axios
      .get("https://blood-donation-vert.vercel.app/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  const currentReviews = reviews.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div>
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-2 border border-red-200">
            <FaCommentDots className="text-red-500" /> Review Management
          </span>
          <h2 className="text-3xl font-bold text-gray-900">All User Reviews</h2>
        </div>
      </div>

      {/* Table */}
      {currentReviews.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
          <p className="text-gray-500">No reviews yet.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-100 shadow-md bg-white overflow-hidden">
          <div className="overflow-auto max-h-[520px]">
            <table className="w-full text-sm table-fixed min-w-[760px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                  <th className="px-4 py-3.5 text-left font-semibold w-16">Avatar</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/6">User</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/5">Email</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-36">Rating</th>
                  <th className="px-4 py-3.5 text-left font-semibold">Review</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-40">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.map((r, idx) => (
                  <tr
                    key={r._id}
                    className={`border-t border-red-50 h-[65px] ${idx % 2 === 1 ? 'bg-red-50/40' : 'bg-white'} hover:bg-red-50 transition-colors`}
                  >
                    <td className="px-4 py-3">
                      <img
                        src={r.photoURL}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover border border-red-100"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 truncate">{r.userName}</td>
                    <td className="px-4 py-3 text-gray-600 truncate">{r.userEmail}</td>
                    <td className="px-4 py-3">
                      <ReactStars
                        count={5}
                        size={20}
                        value={r.rating}
                        edit={false}
                        color2="#facc15"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate">{r.review}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* See More */}
      <Pagination
        total={reviews.length}
        visible={visibleCount}
        onSeeMore={() => setVisibleCount((c) => c + batchSize)}
        batchSize={batchSize}
      />
    </div>
  );
};

export default ReviewAll;