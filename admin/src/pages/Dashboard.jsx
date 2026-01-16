import { useState, useEffect } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import VisitorStats from "../components/dashboard/VisitorStats";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import TopProjects from "../components/dashboard/TopProjects";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import SearchBar from "../components/common/SearchBar";
import { api } from "../services/api";

// Lucide icons
import { Users, Briefcase, MessageSquare, CreditCard } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    messages: 0,
    sales: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data.stats);
        setRecentProjects(res.data.recentProjects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const filteredProjects = recentProjects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <div className="mt-10 text-center text-gray-600">Loading...</div>;

  return (
    <div className="space-y-6 p-6">
      {/* Search bar */}
      <div className="flex justify-end">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search projects..."
        />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<Users size={28} className="text-blue-500" />}
          label="Users"
          number={stats.users}
          change="+12%"
          trend="up"
          color="bg-white"
        />
        <StatsCard
          icon={<Briefcase size={28} className="text-purple-500" />}
          label="Projects"
          number={stats.projects}
          change="+8%"
          trend="up"
          color="bg-white"
        />
        <StatsCard
          icon={<MessageSquare size={28} className="text-yellow-500" />}
          label="Messages"
          number={stats.messages}
          change="-2%"
          trend="down"
          color="bg-white"
        />
        <StatsCard
          icon={<CreditCard size={28} className="text-green-500" />}
          label="Sales"
          number={stats.sales}
          change="+20%"
          trend="up"
          color="bg-white"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsChart data={stats} title="Overall Analytics" />
        <VisitorStats />
      </div>

      {/* Top projects + recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopProjects projects={filteredProjects} />
        <RecentActivity />
      </div>

      {/* Quick actions */}
      <QuickActions />
    </div>
  );
};

export default Dashboard;
