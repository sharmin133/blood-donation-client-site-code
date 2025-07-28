import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Fund = () => {
  const navigate = useNavigate();
  const [funds, setFunds] = useState([]);

const{user}=use(AuthContext)
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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



  // Calculate pagination
  const totalPages = Math.ceil(funds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedFunds = funds.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen">
      <div className="flex justify-between mb-4">
         <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold  mb-4">
          Support Life With Your Contribution
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Your generous donation helps us provide support and resources to those in need. 
          Every contribution matters and makes a difference.
        </p>
      </div>
        <button onClick={handleFundClick} className="btn rounded-2xl p-6 text-2xl bg-red-600 hover:bg-red-800">
         Give Fund Now
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Amount</th>
            <th className="border border-gray-300 p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {selectedFunds.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                No funds found
              </td>
            </tr>
          ) : (
            selectedFunds.map((fund) => (
              <tr key={fund._id}>
                <td className="border border-gray-300 p-2">{fund.name}</td>
                <td className="border border-gray-300 p-2">
                  ${(fund.amount / 100).toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(fund.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          className="btn btn-outline"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="btn btn-outline"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Fund;
