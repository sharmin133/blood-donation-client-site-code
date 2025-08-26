import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VolunteerAllRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    inprogress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    canceled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4">All Blood Donation Requests 🩸</h2>

      {/* Filter Dropdown */}
      <div className="mb-4 flex items-center gap-2">
        <label className="font-semibold text-gray-700 dark:text-white">Filter by Status:</label>
        <select
          value={filteredStatus}
          onChange={(e) => {
            setFilteredStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered select-sm w-48"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Requester Name</th>
              <th>Blood Group</th>
              <th>District</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? currentItems.map((req) => (
              <tr key={req._id}>
                <td>{req.requesterName}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.district}</td>
                <td>
                  <span
                    className={`badge badge-md min-w-[100px] text-center ${statusColors[req.status] || 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req._id, e.target.value)}
                    className="select select-sm select-bordered w-36"
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-sm btn-outline bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Prev
          </button>
          <span className="text-sm pt-2">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-sm btn-outline bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VolunteerAllRequest;
