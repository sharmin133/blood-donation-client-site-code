import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTint } from 'react-icons/fa';
import Pagination from '../../../Pagination/Pagination';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  inprogress: 'bg-blue-100 text-blue-700 border-blue-200',
  done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  canceled: 'bg-gray-200 text-gray-600 border-gray-300',
};

const STATUS_OPTIONS = ['all', 'pending', 'inprogress', 'done', 'canceled'];

const VolunteerAllRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('all');
  const [visibleCount, setVisibleCount] = useState(7);
  const batchSize = 7;

  const fetchRequests = async () => {
    try {
      const res = await axios.get('https://blood-donation-vert.vercel.app/donation-requests');
      setRequests(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load requests');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/donation-requests/${id}`, { status });
      toast.success('Status updated');
      fetchRequests();
    } catch (err) {
      console.log(err);
      toast.error('Failed to update status');
    }
  };

  const filteredRequests = filteredStatus === 'all'
    ? requests
    : requests.filter((req) => req.status === filteredStatus);

  const currentItems = filteredRequests.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div>
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-2 border border-red-200">
            <FaTint className="text-red-500" /> Donation Management
          </span>
          <h2 className="text-3xl font-bold text-gray-900">All Blood Donation Requests</h2>
        </div>

        {/* Filter */}
        <select
          value={filteredStatus}
          onChange={(e) => {
            setFilteredStatus(e.target.value);
            setVisibleCount(batchSize);
          }}
          className="px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 font-medium
                     focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition cursor-pointer"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Requests' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {currentItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
          <p className="text-gray-500">No requests found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-100 shadow-md bg-white overflow-hidden">
          <div className="overflow-auto max-h-[520px]">
            <table className="w-full text-sm table-fixed min-w-[760px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                  <th className="px-4 py-3.5 text-left font-semibold w-1/4">Requester Name</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-28">Blood Group</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/5">District</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-28">Status</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-44">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((req, idx) => (
                  <tr
                    key={req._id}
                    className={`border-t border-red-50 h-[65px] ${idx % 2 === 1 ? 'bg-red-50/40' : 'bg-white'} hover:bg-red-50 transition-colors`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 truncate">{req.requesterName}</td>
                    <td className="px-4 py-3 text-gray-600">{req.bloodGroup}</td>
                    <td className="px-4 py-3 text-gray-600 truncate">{req.district}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-semibold uppercase px-2.5 py-1 rounded-full border capitalize ${
                        STATUS_STYLES[req.status] || 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                        className="px-3 py-2 rounded-lg border border-red-100 bg-white text-gray-800 text-sm font-medium
                                   focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>
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

export default VolunteerAllRequest;