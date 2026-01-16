// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex min-h-screen flex-1 flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="mt-16 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
