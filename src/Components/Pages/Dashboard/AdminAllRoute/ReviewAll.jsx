import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-stars";

const ReviewAll = () => {
  const [reviews, setReviews] = useState([]);

 useEffect(() => {
  axios.get("https://blood-donation-vert.vercel.app/reviews")
    .then((res) => setReviews(res.data))
    .catch((err) => console.error(err));
}, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All User Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                
                <th>User</th>
                <th>Image</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r._id} className="border-b">
                  <td>{r.userName}</td>
                   <td><img src={r.photoURL} alt="avatar" className="w-10 h-10 rounded-full" /></td>
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
      )}
    </div>
  );
};

export default ReviewAll;
