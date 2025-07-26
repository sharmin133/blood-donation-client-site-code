import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Fund = () => {
  const navigate = useNavigate();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFundClick = () => {
    navigate('/fund-page');
  };

  useEffect(() => {
    fetch('http://localhost:3000/funds')
      .then((res) => res.json())
      .then((data) => {
        setFunds(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading funds...</p>;

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
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-red-700">Give Fund</h2>
        <button onClick={handleFundClick} className="btn btn-primary">
          Fund
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
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
