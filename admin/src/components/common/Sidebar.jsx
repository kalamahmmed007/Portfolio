// src/components/common/Sidebar.jsx
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Folder,
  Award,
  User,
  FileText,
  MessageCircle,
  Settings,
  BarChart2,
  ChevronDown,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    {
      label: "Projects",
      icon: <Folder size={18} />,
      submenu: [
        { label: "All Projects", path: "/projects" },
        { label: "Add Project", path: "/projects/add" },
      ],
    },
    {
      label: "Skills",
      icon: <Award size={18} />,
      submenu: [
        { label: "All Skills", path: "/skills" },
        { label: "Manage Skills", path: "/skills/manage" },
      ],
    },
    {
      label: "Experience",
      icon: <User size={18} />,
      submenu: [
        { label: "All Experience", path: "/experience" },
        { label: "Manage Experience", path: "/experience/manage" },
      ],
    },
    {
      label: "Education",
      icon: <FileText size={18} />,
      submenu: [
        { label: "All Education", path: "/education" },
        { label: "Manage Education", path: "/education/manage" },
      ],
    },
    {
      label: "Testimonials",
      icon: <MessageCircle size={18} />,
      submenu: [
        { label: "All Testimonials", path: "/testimonials" },
        { label: "Manage Testimonials", path: "/testimonials/manage" },
      ],
    },
    {
      label: "Blog",
      icon: <FileText size={18} />,
      submenu: [
        { label: "All Blog", path: "/blog" },
        { label: "Add Blog", path: "/blog/add" },
      ],
    },
    {
      label: "Messages",
      icon: <MessageCircle size={18} />,
      submenu: [{ label: "All Messages", path: "/messages" }],
    },
    { label: "Analytics", path: "/analytics", icon: <BarChart2 size={18} /> },
    {
      label: "Settings",
      icon: <Settings size={18} />,
      submenu: [
        { label: "Profile", path: "/settings/profile" },
        { label: "Security", path: "/settings/security" },
        { label: "Site Settings", path: "/settings/site" },
        { label: "Social Media", path: "/settings/social" },
      ],
    },
    {
      label: "File Manager",
      icon: <Folder size={18} />,
      submenu: [{ label: "File Manager", path: "/file-manager" }], 
    },

    
    {
      label: "Logout",
      path: "/logout",
      icon: <Settings size={20} />,
    }
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-64 overflow-y-auto border-r border-slate-200 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="mb-8 text-xl font-bold text-slate-800">Admin Panel</h1>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item, idx) => (
            <div key={idx}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openMenus[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMenus[item.label] &&
                    item.submenu.map((sub, i) => (
                      <NavLink
                        key={i}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block py-2 pl-10 pr-3 rounded hover:bg-blue-100 hover:text-blue-700 transition-colors ${
                            location.pathname === sub.path ? "bg-blue-100 text-blue-700 font-semibold" : ""
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-2 text-slate-700 font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors ${
                      isActive ? "bg-blue-100 text-blue-700" : ""
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
