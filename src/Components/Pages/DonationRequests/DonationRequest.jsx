import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router'; 
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('https://blood-donation-vert.vercel.app/donation-requests');
        const pending = res.data.filter(req => req.status === 'pending');
        setRequests(pending);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="bg-gray-500 min-h-screen mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-6 text-white ">Pending Donation Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600 text-center">No pending requests found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map(req => (
            <div
              key={req._id}
              className="bg-red-100 border border-red-300 rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-red-700">{req.recipientName}</h3>
              <p className='text-black'><strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}</p>
              <p className='text-black'><strong>Blood Group:</strong> {req.bloodGroup}</p>
              <p className='text-black'><strong>Date:</strong> {req.donationDate}</p>
              <p className='text-black'><strong>Time:</strong> {req.donationTime}</p>
              <button
                onClick={() => {
                  if (!user) {
                    navigate('/login', { state: { from: `/donation-requests/${req._id}` } });
                  } else {
                    navigate(`/donation-requests/${req._id}`);
                  }
                }}
                className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequest;

