import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FaTint, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaHandHoldingHeart, FaArrowRight } from 'react-icons/fa';

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('https://blood-donation-vert.vercel.app/donation-requests');
        const pending = res.data.filter((req) => req.status === 'pending');
        setRequests(pending);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleView = (id) => {
    if (!user) {
      navigate('/login', { state: { from: `/donation-requests/${id}` } });
    } else {
      navigate(`/donation-requests/${id}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-red-50 to-white px-4 md:px-12 py-20 min-h-screen overflow-hidden">

      {/* decorative background glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-red-200">
            <FaHandHoldingHeart className="text-red-500" /> Someone Needs You
          </span>
          <h2
            className="text-3xl md:text-5xl text-gray-900 uppercase leading-[0.95]"
            style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
          >
            Pending Donation<br className="hidden md:block" />{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Requests
            </span>
          </h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border border-red-100 shadow-md p-6 animate-pulse">
                <div className="h-6 bg-red-100 rounded w-2/3 mb-4" />
                <div className="h-4 bg-red-100 rounded w-full mb-2" />
                <div className="h-4 bg-red-100 rounded w-4/5 mb-2" />
                <div className="h-4 bg-red-100 rounded w-3/5 mb-4" />
                <div className="h-9 bg-red-100 rounded-full w-24" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && requests.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 border border-red-200
                            flex items-center justify-center text-red-400 text-2xl mb-4">
              <FaTint />
            </div>
            <p className="text-gray-500">No pending donation requests right now.</p>
          </div>
        )}

        {/* Requests grid */}
        {!loading && requests.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req, i) => (
              <div
                key={req._id}
                className="group relative bg-gradient-to-br from-white via-red-50/50 to-red-100/40
                           border border-red-100 rounded-2xl shadow-md hover:shadow-2xl p-6
                           transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                {/* top accent bar */}
                <span className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-red-700" />

                {/* decorative glow */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-red-300/20 blur-2xl rounded-full pointer-events-none" />

                <div className="relative flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug pr-2">
                    {req.recipientName}
                  </h3>
                  <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full
                                   bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-sm shadow-md">
                    {req.bloodGroup}
                  </span>
                </div>

                <div className="relative space-y-2.5 text-sm text-gray-700 mb-6">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500 shrink-0" />
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-red-500 shrink-0" />
                    {req.donationDate}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-red-500 shrink-0" />
                    {req.donationTime}
                  </p>
                </div>

                <button
                  onClick={() => handleView(req._id)}
                  className="relative inline-flex items-center gap-2 bg-red-700 text-white font-semibold
                             px-5 py-2.5 rounded-full shadow-md hover:bg-red-800 transition-colors cursor-pointer"
                >
                  View Details <FaArrowRight className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationRequest;