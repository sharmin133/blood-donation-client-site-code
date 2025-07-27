import React, { useEffect, useState, useContext } from 'react';
import { FaUsers, FaDonate, FaTint } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';


const Card = ({ icon, title, value }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex items-center gap-4">
    <div className="text-4xl text-red-600">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-3xl font-bold text-red-700 dark:text-red-400">{value}</p>
    </div>
  </div>
);

const VolunteerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all stats in parallel
    const fetchStats = async () => {
      try {
        const [usersRes, fundingRes, requestsRes] = await Promise.all([
          axios.get('http://localhost:3000/stats/users'),
          axios.get('http://localhost:3000/stats/funding'),
          axios.get('http://localhost:3000/stats/donation-requests'),
        ]);
        setTotalUsers(usersRes.data.totalUsers || 0);
        setTotalFunding(fundingRes.data.totalFunding || 0);
        setTotalRequests(requestsRes.data.totalRequests || 0);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-red-700 dark:text-red-500">
          Welcome back, {user?.displayName }!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-2xl mt-2">Role: {user?.role || 'Volunteer'}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card icon={<FaUsers fill='yellow' />} title="Total Users" value={totalUsers} />
        <Card icon={<FaDonate fill='green' />} title="Total Funding ($)" value={`${(totalFunding / 100).toFixed(2)}`} />
        <Card icon={<FaTint  />} title="Blood Donation Requests" value={totalRequests} />
      </div>
    </div>
  );
};




export default VolunteerDashboard;