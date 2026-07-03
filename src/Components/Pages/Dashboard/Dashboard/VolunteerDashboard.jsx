import React, { useEffect, useState, useContext } from "react";
import { FaUsers, FaDonate, FaTint, FaChartLine, FaChartBar, FaChartArea } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts";

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

// Chart card shell
const ChartShell = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-red-100 shadow-md p-6">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

// 1) Full Donut Gauge — Total Users
const GaugeCard = ({ title, value, displayValue, color }) => {
  const ceiling = Math.max(Math.ceil((value || 0) / 10) * 10, 10, value * 1.2);
  const data = [
    { name: "value", value, fill: color },
    { name: "rest", value: Math.max(ceiling - value, 0), fill: "#f3f4f6" },
  ];
  return (
    <ChartShell icon={<FaChartLine className="text-red-400 text-sm" />} title={title}>
      <div className="relative h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="70%"
              outerRadius="95%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
          <p className="text-xs text-gray-500">{title}</p>
        </div>
      </div>
    </ChartShell>
  );
};

// 2) Filled Area Chart — Total Funding
const FundingAreaCard = ({ title, value, displayValue, color }) => {
  const data = [
    { name: "Start", amount: 0 },
    { name: "Now", amount: value },
  ];
  return (
    <ChartShell icon={<FaChartArea className="text-red-400 text-sm" />} title={title}>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fundingFillVol" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "0.75rem", border: "1px solid #fecaca", fontSize: "0.85rem" }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={color}
            strokeWidth={3}
            fill="url(#fundingFillVol)"
            dot={{ r: 4, fill: color }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-center text-2xl font-bold text-gray-900 mt-1">{displayValue}</p>
    </ChartShell>
  );
};

// 3) Semi-Circle (Half Donut) Gauge — Total Requests
const RequestsGaugeCard = ({ title, value, displayValue, color }) => {
  const ceiling = Math.max(Math.ceil((value || 0) / 10) * 10, 10, value * 1.2);
  const data = [
    { name: "value", value, fill: color },
    { name: "rest", value: Math.max(ceiling - value, 0), fill: "#f3f4f6" },
  ];
  return (
    <ChartShell icon={<FaTint className="text-red-400 text-sm" />} title={title}>
      <div className="relative h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius="75%"
              outerRadius="115%"
              paddingAngle={2}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
          <p className="text-xs text-gray-500">{title}</p>
        </div>
      </div>
    </ChartShell>
  );
};

// 4) Grouped Comparison Bar
const ComparisonChartCard = ({ title, data }) => (
  <ChartShell icon={<FaChartBar className="text-red-400 text-sm" />} title={title}>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: "#fef2f2" }}
          contentStyle={{ borderRadius: "0.75rem", border: "1px solid #fecaca", fontSize: "0.85rem" }}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={45}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartShell>
);

// 5) Radar Chart — overall composition
const RadarOverviewCard = ({ title, data }) => (
  <ChartShell icon={<FaChartArea className="text-red-400 text-sm" />} title={title}>
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data}>
        <PolarGrid stroke="#fee2e2" />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <PolarRadiusAxis tick={{ fontSize: 10, fill: "#9ca3af" }} />
        <Radar dataKey="score" stroke="#ef4444" fill="#ef4444" fillOpacity={0.35} />
        <Tooltip
          contentStyle={{ borderRadius: "0.75rem", border: "1px solid #fecaca", fontSize: "0.85rem" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  </ChartShell>
);

// 6) Funding Efficiency — horizontal comparison bars
const EfficiencyChartCard = ({ title, data }) => (
  <ChartShell icon={<FaChartBar className="text-red-400 text-sm" />} title={title}>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#fee2e2" />
        <XAxis type="number" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} width={90} />
        <Tooltip
          cursor={{ fill: "#fef2f2" }}
          contentStyle={{ borderRadius: "0.75rem", border: "1px solid #fecaca", fontSize: "0.85rem" }}
        />
        <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartShell>
);

const VolunteerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, fundingRes, requestsRes] = await Promise.all([
          axios.get("https://blood-donation-vert.vercel.app/stats/users"),
          axios.get("https://blood-donation-vert.vercel.app/stats/funding"),
          axios.get(
            "https://blood-donation-vert.vercel.app/stats/donation-requests"
          ),
        ]);
        setTotalUsers(usersRes.data.totalUsers || 0);
        setTotalFunding(fundingRes.data.totalFunding || 0);
        setTotalRequests(requestsRes.data.totalRequests || 0);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const fundingDollars = totalFunding / 100;
  const avgFundingPerUser = totalUsers > 0 ? fundingDollars / totalUsers : 0;
  const avgFundingPerRequest = totalRequests > 0 ? fundingDollars / totalRequests : 0;

  const comparisonData = [
    { name: "Users", value: totalUsers, color: "#f59e0b" },
    { name: "Requests", value: totalRequests, color: "#ef4444" },
  ];

  const maxVal = Math.max(totalUsers, fundingDollars, totalRequests, 1);
  const radarData = [
    { metric: "Users", score: (totalUsers / maxVal) * 100 },
    { metric: "Funding", score: (fundingDollars / maxVal) * 100 },
    { metric: "Requests", score: (totalRequests / maxVal) * 100 },
  ];

  const efficiencyData = [
    { name: "Per User", value: Number(avgFundingPerUser.toFixed(2)), color: "#4338ca" },
    { name: "Per Request", value: Number(avgFundingPerRequest.toFixed(2)), color: "#be185d" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                          tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-red-200">
          <FaChartLine className="text-red-500" /> Overview
        </span>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.displayName || "Volunteer"} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          You're logged in as{" "}
          <span className="font-semibold text-red-700 capitalize">{user?.role || "volunteer"}</span>.
          Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards — original 3 only */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          icon={<FaUsers />}
          title="Total Users"
          value={totalUsers}
          accent={{ bg: "#fef3c7", text: "#b45309" }}
        />
        <StatCard
          icon={<FaDonate />}
          title="Total Funding"
          value={`$${fundingDollars.toFixed(2)}`}
          accent={{ bg: "#d1fae5", text: "#047857" }}
        />
        <StatCard
          icon={<FaTint />}
          title="Blood Requests"
          value={totalRequests}
          accent={{ bg: "#fee2e2", text: "#b91c1c" }}
        />
      </div>

      {/* Charts — 6 total, all visually distinct */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GaugeCard title="Total Users" value={totalUsers} displayValue={totalUsers} color="#f59e0b" />
        <FundingAreaCard
          title="Total Funding"
          value={fundingDollars}
          displayValue={`$${fundingDollars.toFixed(2)}`}
          color="#10b981"
        />
        <RequestsGaugeCard
          title="Total Requests"
          value={totalRequests}
          displayValue={totalRequests}
          color="#3b82f6"
        />

        <ComparisonChartCard title="Users vs Requests" data={comparisonData} />
        <RadarOverviewCard title="Overall Composition" data={radarData} />
        <EfficiencyChartCard title="Funding Efficiency ($)" data={efficiencyData} />
      </div>
    </div>
  );
};

export default VolunteerDashboard;