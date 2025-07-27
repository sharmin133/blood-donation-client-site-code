import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const AllDonationRequests = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:3000/donation-requests")
      .then((res) => setDonationRequests(res.data))
      .catch(() => toast.error("Failed to load donation requests"));

    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const filteredRequests = statusFilter
    ? donationRequests.filter((req) => req.status === statusFilter)
    : donationRequests;

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2
        className="text-3xl font-bold text-red-700 dark:text-red-500 mb-6 text-center"
        data-aos="fade-down"
      >
        All Blood Donation Requests
      </h2>

      {/* Filter Buttons */}
      <div
        className="mb-6 flex gap-4 justify-center flex-wrap"
        data-aos="zoom-in"
      >
        {["pending", "inprogress", "done", "canceled", ""].map((status, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 border ${
              statusFilter === status
                ? "bg-red-600 text-white border-red-600"
                : "bg-transparent text-red-600 dark:text-red-400 border-red-500 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => handleStatusFilter(status)}
          >
            {status === "" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Donation Requests Table */}
      <div className="overflow-x-auto" data-aos="fade-up">
        <table className="min-w-full bg-white dark:bg-black shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-red-600 text-white dark:bg-red-700">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">District</th>
              <th className="px-4 py-3 text-left">Upazila</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req, i) => (
                <tr
                  key={req._id}
                  className="border-b dark:border-gray-800"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <td className="px-4 py-3">{req.requesterName}</td>
                  <td className="px-4 py-3">{req.district}</td>
                  <td className="px-4 py-3">{req.upazila}</td>
                  <td className="px-4 py-3">{req.donationDate}</td>
                  <td className="px-4 py-3 capitalize text-sm font-medium">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : req.status === "inprogress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : req.status === "done"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-red-600 dark:text-red-400">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex justify-center items-center mt-6 space-x-2"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-red-500 hover:text-white dark:bg-gray-700 dark:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonationRequests;
