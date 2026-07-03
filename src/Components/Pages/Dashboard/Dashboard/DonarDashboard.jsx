import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import {
  FaTint,
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaEye,
  FaChartBar,
} from 'react-icons/fa';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  inprogress: 'bg-blue-100 text-blue-700 border-blue-200',
  done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  canceled: 'bg-gray-200 text-gray-600 border-gray-300',
};

const STATUS_COLORS = {
  pending: '#f59e0b',
  inprogress: '#3b82f6',
  done: '#10b981',
  canceled: '#9ca3af',
};

// Reusable Stat Card
const StatCard = ({ icon, title, value, accent }) => (
  <div className="bg-white rounded-2xl border border-red-100 shadow-md p-6 flex items-center gap-4
                   hover:shadow-lg transition-shadow">
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
      style={{ backgroundColor: accent.bg, color: accent.text }}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 truncate">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-900 mt-0.5 truncate">{value}</p>
    </div>
  </div>
);

// Row-level Action Menu
const ActionMenu = ({ req, onStatusChange, onDelete, onEdit, onView }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const runAndClose = (fn) => {
    fn();
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-red-100
                   text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
        aria-label="Actions"
      >
        <FaEllipsisV className="text-xs" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-red-100 shadow-xl z-20 overflow-hidden">
          <button
            onClick={() => runAndClose(() => onView(req._id))}
            className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
          >
            <FaEye className="text-xs" /> View
          </button>

          <button
            onClick={() => runAndClose(() => onEdit(req._id))}
            className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition cursor-pointer border-t border-red-50"
          >
            <FaEdit className="text-xs" /> Edit
          </button>

          {req.status === 'inprogress' && (
            <>
              <button
                onClick={() => runAndClose(() => onStatusChange(req._id, 'done'))}
                className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-emerald-700 hover:bg-red-50 transition cursor-pointer border-t border-red-50"
              >
                <FaCheckCircle className="text-xs" /> Mark Done
              </button>
              <button
                onClick={() => runAndClose(() => onStatusChange(req._id, 'canceled'))}
                className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-amber-700 hover:bg-red-50 transition cursor-pointer border-t border-red-50"
              >
                <FaHourglassHalf className="text-xs" /> Cancel
              </button>
            </>
          )}

          <button
            onClick={() => runAndClose(() => onDelete(req._id))}
            className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer border-t border-red-50"
          >
            <FaTrash className="text-xs" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

const DonorDashboard = () => {
  const { user, userData } = useContext(AuthContext);
  const [recentRequests, setRecentRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.email) {
      axios.get(`https://blood-donation-vert.vercel.app/donation-requests/requester/${userData.email}`)
        .then(res => {
          const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentRequests(sorted.slice(0, 3));
          setAllRequests(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [userData]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this donation request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://blood-donation-vert.vercel.app/donation-requests/${id}`);
        setRecentRequests(prev => prev.filter(req => req._id !== id));
        setAllRequests(prev => prev.filter(req => req._id !== id));
        Swal.fire('Deleted!', 'Donation request has been deleted.', 'success');
      } catch (err) {
        console.error('Failed to delete request', err);
        toast.error('Failed to delete donation request.');
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/donation-requests/${id}`, { status });
      setRecentRequests(prev =>
        prev.map(req => req._id === id ? { ...req, status } : req)
      );
      setAllRequests(prev =>
        prev.map(req => req._id === id ? { ...req, status } : req)
      );
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Stat counts
  const pendingCount = allRequests.filter(r => r.status === 'pending').length;
  const inProgressCount = allRequests.filter(r => r.status === 'inprogress').length;
  const doneCount = allRequests.filter(r => r.status === 'done').length;

  // Chart Data: status-wise count
  const chartData = [
    { name: 'Pending', value: pendingCount, status: 'pending' },
    { name: 'In Progress', value: inProgressCount, status: 'inprogress' },
    { name: 'Done', value: doneCount, status: 'done' },
    { name: 'Canceled', value: allRequests.filter(r => r.status === 'canceled').length, status: 'canceled' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                          tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-red-200">
          <FaTint className="text-red-500" /> Donor Overview
        </span>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {userData?.name || 'Donor'} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          You're logged in as{" "}
          <span className="font-semibold text-red-700 capitalize">{user?.role || 'donor'}</span>.
          Here's a summary of your donation requests.
        </p>
      </div>

      {/* Stat Cards — new, derived from allRequests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<FaClipboardList />}
          title="Total Requests"
          value={allRequests.length}
          accent={{ bg: '#fee2e2', text: '#b91c1c' }}
        />
        <StatCard
          icon={<FaHourglassHalf />}
          title="Pending"
          value={pendingCount}
          accent={{ bg: '#fef3c7', text: '#b45309' }}
        />
        <StatCard
          icon={<FaTint />}
          title="In Progress"
          value={inProgressCount}
          accent={{ bg: '#dbeafe', text: '#1d4ed8' }}
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Completed"
          value={doneCount}
          accent={{ bg: '#d1fae5', text: '#047857' }}
        />
      </div>

      {allRequests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
          <p className="text-gray-500 mb-4">You haven't created any donation requests yet.</p>
          <Link
            to="/dashboard/create-donation-request"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold
                       px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            Create Your First Request
          </Link>
        </div>
      ) : (
        <>
          {/* Recent Requests Table */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">Recent Donation Requests</h3>
            <Link
              to="/dashboard/my-requests"
              className="text-sm font-semibold text-red-700 hover:underline underline-offset-4"
            >
              View All →
            </Link>
          </div>

          <div className="rounded-2xl border border-red-100 shadow-md bg-white overflow-hidden mb-10">
            <div className="overflow-auto max-h-[420px]">
              <table className="w-full text-sm table-fixed min-w-[820px]">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                    <th className="px-4 py-3.5 text-left font-semibold w-12">#</th>
                    <th className="px-4 py-3.5 text-left font-semibold w-1/6">Recipient</th>
                    <th className="px-4 py-3.5 text-left font-semibold w-1/5">Location</th>
                    <th className="px-4 py-3.5 text-left font-semibold w-28">Date</th>
                    <th className="px-4 py-3.5 text-left font-semibold w-24">Time</th>
                    <th className="px-4 py-3.5 text-left font-semibold w-20">Blood</th>
                    <th className="px-4 py-3.5 text-left font-semibold w-28">Status</th>
                    <th className="px-4 py-3.5 text-right font-semibold w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((req, idx) => (
                    <tr
                      key={req._id}
                      className={`border-t border-red-50 h-[65px] ${idx % 2 === 1 ? 'bg-red-50/40' : 'bg-white'} hover:bg-red-50 transition-colors`}
                    >
                      <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 truncate">{req.recipientName}</td>
                      <td className="px-4 py-3 text-gray-600 truncate">
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{req.donationDate}</td>
                      <td className="px-4 py-3 text-gray-600">{req.donationTime}</td>
                      <td className="px-4 py-3 text-gray-600">{req.bloodGroup}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-xs font-semibold uppercase px-2.5 py-1 rounded-full border capitalize ${
                          STATUS_STYLES[req.status] || 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <ActionMenu
                          req={req}
                          onStatusChange={handleStatusChange}
                          onDelete={handleDelete}
                          onEdit={(id) => navigate(`/dashboard/edit-donation-request/${id}`)}
                          onView={(id) => navigate(`/dashboard/donation-request/${id}`)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl border border-red-100 shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaChartBar className="text-red-400 text-sm" />
              <h3 className="text-base font-semibold text-gray-800">Your Donations Overview</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "#fef2f2" }}
                  contentStyle={{ borderRadius: "0.75rem", border: "1px solid #fecaca", fontSize: "0.85rem" }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={55}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default DonorDashboard;