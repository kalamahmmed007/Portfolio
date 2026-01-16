// src/components/common/Header.jsx
import React, { useState, useEffect } from "react";
import { Sun, Moon, Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import Dropdown from "../ui/Dropdown";

const Header = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live BDT clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Dhaka",
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const handleLogout = () => {
    removeToken(); // clear token
    navigate("/admin/login");
  };

  return (
    <header className="fixed left-64 top-0 z-20 flex w-[calc(100%-16rem)] items-center justify-between bg-white px-6 py-3 shadow-md dark:bg-gray-800">
      {/* Left side */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Admin Panel
        </h1>
        <span className="ml-4 font-medium text-gray-600 dark:text-gray-300">
          {currentTime} BDT
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Dark/Light toggle */}
        <button
          onClick={toggleDarkMode}
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell size={20} />
          <span className="absolute right-0 top-0 inline-flex h-2 w-2 animate-ping rounded-full bg-red-500"></span>
          <span className="absolute right-0 top-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User dropdown */}
        <Dropdown>
          <Dropdown.Button className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
            <User size={18} className="dark:text-gray-100" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Admin
            </span>
          </Dropdown.Button>
          <Dropdown.Menu className="right-0 mt-2 w-48 rounded-lg bg-white shadow-lg dark:bg-gray-700">
            <Dropdown.Item to="/settings/profile">Profile</Dropdown.Item>
            <Dropdown.Item to="/settings/security">Security</Dropdown.Item>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <LogOut size={16} /> Logout
            </button>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
