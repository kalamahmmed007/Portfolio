import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const dummyData = [
  { name: "Jan", users: 30, projects: 20 },
  { name: "Feb", users: 45, projects: 25 },
  { name: "Mar", users: 50, projects: 30 },
  { name: "Apr", users: 60, projects: 40 },
  { name: "May", users: 70, projects: 50 },
  { name: "Jun", users: 80, projects: 60 },
];

const AnalyticsChart = () => {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-bold text-slate-800 dark:text-white">
        Analytics Overview
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dummyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="projects" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
