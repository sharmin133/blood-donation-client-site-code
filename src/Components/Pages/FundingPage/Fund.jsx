import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaTint, FaHandHoldingHeart } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Pagination from '../../Pagination/Pagination';

const Fund = () => {
  const navigate = useNavigate();
  const [funds, setFunds] = useState([]);
  const { user } = useContext(AuthContext);

  const [visibleCount, setVisibleCount] = useState(7);
  const batchSize = 7;

  const [sortOrder, setSortOrder] = useState('lowToHigh');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleFundClick = () => {
    navigate('/fund-page');
  };

  useEffect(() => {
    if (user?.uid) {
      axios
        .get(`https://blood-donation-vert.vercel.app/funds/by-user?userId=${user.uid}`)
        .then((res) => {
          setFunds(res.data);
        })
        .catch((err) => {
          console.error("❌ Error fetching funds:", err);
        });
    }
  }, [user?.uid]);

  const sortedFunds = [...funds].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.amount - b.amount;
    } else {
      return b.amount - a.amount;
    }
  });

  const currentFunds = sortedFunds.slice(0, visibleCount);

  return (
    <section className="bg-gradient-to-b from-red-50 to-red-100 px-4 md:px-12 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-red-700 text-white text-xs font-semibold
                              tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 shadow-md">
              <FaTint className="text-red-200" /> Your Contributions
            </span>
            <h1
              className="text-3xl md:text-5xl text-red-800 uppercase leading-[0.95] mb-4"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Support Life With <span className="text-gray-900">Your Contribution</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto md:mx-0 text-base sm:text-lg">
              Your generous donation helps us provide support and resources to those in need.
              Every contribution matters and makes a difference.
            </p>
          </div>

          <button
            onClick={handleFundClick}
            className="shrink-0 inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white
                       font-semibold px-6 py-3 rounded-2xl text-lg shadow-md transition-colors cursor-pointer"
          >
            <FaHandHoldingHeart /> Give Fund Now
          </button>
        </div>

        {/* Sub-heading + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Your Fund History</h2>

          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700 text-sm">Sort by:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-red-200 bg-white text-gray-800 font-medium
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition cursor-pointer"
            >
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {currentFunds.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
            <p className="text-gray-500">No funds found.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-red-100 shadow-md bg-white overflow-hidden">
            <div className="overflow-auto max-h-[520px]">
              <table className="w-full text-sm table-fixed min-w-[600px]">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                    <th className="px-4 py-3.5 text-left font-semibold w-1/3">Name</th>
                    <th className="px-4 py-3.5 text-left font-semibold w-1/3">Amount</th>
                    <th className="px-4 py-3.5 text-left font-semibold w-1/3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFunds.map((fund, idx) => (
                    <tr
                      key={fund._id}
                      className={`border-t border-red-50 h-[65px] ${idx % 2 === 1 ? 'bg-red-50/40' : 'bg-white'} hover:bg-red-50 transition-colors`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 truncate">{fund.name}</td>
                      <td className="px-4 py-3 text-gray-600">
                        ${(fund.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(fund.createdAt).toLocaleDateString()}
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
          total={sortedFunds.length}
          visible={visibleCount}
          onSeeMore={() => setVisibleCount((c) => c + batchSize)}
          batchSize={batchSize}
        />
      </div>
    </section>
  );
};

export default Fund;