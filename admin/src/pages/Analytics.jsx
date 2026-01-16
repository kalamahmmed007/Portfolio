import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import { useEffect, useState } from "react";
import { api } from "../services/api";

const Analytics = () => {
  const [stats, setStats] = useState({ users: [], sales: [] });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/analytics");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="mb-2 font-semibold">User Growth</h3>
          <LineChart data={stats.users} />
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="mb-2 font-semibold">Sales</h3>
          <BarChart data={stats.sales} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
