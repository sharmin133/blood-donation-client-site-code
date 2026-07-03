import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaTint } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import Pagination from '../../../Pagination/Pagination';

const STATUS_FILTERS = ['all', 'pending', 'inprogress', 'done', 'canceled'];

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  inprogress: 'bg-blue-100 text-blue-700 border-blue-200',
  done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  canceled: 'bg-gray-200 text-gray-600 border-gray-300',
};

const MyRequestAllDonar = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(7);
  const batchSize = 7;

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://blood-donation-vert.vercel.app/donation-requests/requester/${user.email}`)
        .then(res => setRequests(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const filteredRequests =
    statusFilter === 'all'
      ? requests
      : requests.filter(r => r.status === statusFilter);

  const currentRequests = filteredRequests.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div>
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-2 border border-red-200">
            <FaTint className="text-red-500" /> My Requests
          </span>
          <h2 className="text-3xl font-bold text-gray-900">My Donation Requests</h2>
        </div>

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value);
            setVisibleCount(batchSize);
          }}
          className="px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 font-medium
                     focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition cursor-pointer"
        >
          {STATUS_FILTERS.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Requests' : status[0].toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {currentRequests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
          <p className="text-gray-500">No requests found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-100 shadow-md bg-white overflow-hidden">
          <div className="overflow-auto max-h-[520px]">
            <table className="w-full text-sm table-fixed min-w-[900px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                  <th className="px-4 py-3.5 text-left font-semibold w-12">#</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/6">Recipient</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/6">District</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/6">Upazila</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/6">Hospital</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-20">Blood</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-28">Date</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-28">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((req, idx) => (
                  <tr
                    key={req._id}
                    className={`border-t border-red-50 h-[65px] ${idx % 2 === 1 ? 'bg-red-50/40' : 'bg-white'} hover:bg-red-50 transition-colors`}
                  >
                    <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 truncate">{req.recipientName}</td>
                    <td className="px-4 py-3 text-gray-600 truncate">{req.recipientDistrict}</td>
                    <td className="px-4 py-3 text-gray-600 truncate">{req.recipientUpazila}</td>
                    <td className="px-4 py-3 text-gray-600 truncate">{req.hospitalName}</td>
                    <td className="px-4 py-3 text-gray-600">{req.bloodGroup}</td>
                    <td className="px-4 py-3 text-gray-600">{req.donationDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-semibold uppercase px-2.5 py-1 rounded-full border capitalize ${
                        STATUS_STYLES[req.status] || 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        {req.status}
                      </span>
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
        total={filteredRequests.length}
        visible={visibleCount}
        onSeeMore={() => setVisibleCount((c) => c + batchSize)}
        batchSize={batchSize}
      />
    </div>
  );
};

export default MyRequestAllDonar;