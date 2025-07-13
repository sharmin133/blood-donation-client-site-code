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
      const res = await axios.get('http://localhost:3000/donation-requests');
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
      await axios.patch(`http://localhost:3000/donation-requests/${id}`, { status });
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

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4">All Blood Donation Requests 🩸</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold text-gray-700 dark:text-white">Filter by Status:</label>
        <select
          value={filteredStatus}
          onChange={(e) => {
            setFilteredStatus(e.target.value);
            setCurrentPage(1); // reset to first page when filter changes
          }}
          className="select select-bordered select-sm"
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
                  <span className={`badge ${req.status === 'done' ? 'badge-success' : 'badge-warning'}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req._id, e.target.value)}
                    className="select select-sm select-bordered"
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
            className="btn btn-sm"
          >
            Prev
          </button>
          <span className="text-sm pt-2">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VolunteerAllRequest;
