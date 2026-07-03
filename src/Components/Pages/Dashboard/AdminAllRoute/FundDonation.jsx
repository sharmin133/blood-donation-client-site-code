import React, { useEffect, useState } from 'react';
import { FaHandHoldingUsd } from 'react-icons/fa';
import Pagination from '../../../Pagination/Pagination';

const FundDonation = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(7);
  const batchSize = 7;

  const totalAmount = funds.reduce((sum, fund) => sum + fund.amount, 0);

  useEffect(() => {
    fetch('https://blood-donation-vert.vercel.app/funds')
      .then((res) => res.json())
      .then((data) => {
        setFunds(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentFunds = funds.slice(0, visibleCount);

  if (loading) return <p className="text-center text-red-600">Loading donations...</p>;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-2 border border-red-200">
            <FaHandHoldingUsd className="text-red-500" /> Fund Management
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Fund Donations</h2>
        </div>

        {/* Total Amount */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl px-6 py-3 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Total Donated</p>
          <p className="text-2xl font-bold">${(totalAmount / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Table */}
      {currentFunds.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
          <p className="text-gray-500">No donations found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-100 shadow-md bg-white overflow-hidden">
          <div className="overflow-auto max-h-[520px]">
            <table className="w-full text-sm table-fixed min-w-[600px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                  <th className="px-4 py-3.5 text-left font-semibold w-12">#</th>
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
                    <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
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
        total={funds.length}
        visible={visibleCount}
        onSeeMore={() => setVisibleCount((c) => c + batchSize)}
        batchSize={batchSize}
      />
    </div>
  );
};

export default FundDonation;