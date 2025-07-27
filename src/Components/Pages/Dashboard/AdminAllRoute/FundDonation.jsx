import React, { useEffect, useState } from 'react';

const FundDonation = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalAmount = funds.reduce((sum, fund) => sum + fund.amount, 0);

  useEffect(() => {
    fetch('http://localhost:3000/funds')
      .then((res) => res.json())
      .then((data) => {
        setFunds(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(funds.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFunds = funds.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <p className="text-center text-red-600">Loading donations...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-2 text-red-600 dark:text-red-400 text-center">
        Fund Donations
      </h2>

      {/* Total Amount at Top */}
      <div className="text-right mb-4 text-2xl font-semibold ">
        Total Donated: ${(totalAmount / 100).toFixed(2)}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
          <thead className="bg-red-50 dark:bg-red-700 text-black dark:text-white">
            <tr>
              <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Name</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Amount</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentFunds.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">No donations found</td>
              </tr>
            ) : (
              currentFunds.map((fund) => (
                <tr key={fund._id} className="hover:bg-red-100 dark:hover:bg-red-950 transition">
                  <td className="p-3 border border-gray-300 dark:border-gray-700">{fund.name}</td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700">
                    ${(fund.amount / 100).toFixed(2)}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700">
                    {new Date(fund.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
    <div className="mt-6 flex justify-center items-center gap-4">
  <button
    onClick={handlePrev}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
  >
    Previous
  </button>
  <span className="text-lg font-medium dark:text-white">
    Page {currentPage} of {totalPages || 1}
  </span>
  <button
    onClick={handleNext}
    disabled={currentPage === totalPages || totalPages === 0}
    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
  >
    Next
  </button>
</div>
    
    </div>
  );
};

export default FundDonation;
