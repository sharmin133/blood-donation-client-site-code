import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import axios from 'axios';

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:3000/donation-requests');
        const pending = res.data.filter(req => req.status === 'pending');
        setRequests(pending);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6 ">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Pending Donation Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600 text-center">No pending requests found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map(req => (
            <div
              key={req._id}
              className="border border-red-200 rounded-lg shadow p-4 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-red-700">{req.recipientName}</h3>
              <p><strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}</p>
              <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
              <p><strong>Date:</strong> {req.donationDate}</p>
              <p><strong>Time:</strong> {req.donationTime}</p>
              <Link
                to={`/donation-requests/${req._id}`}
                className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequest;
