import React from "react";
import { Plus, FileText, Users, Settings } from "lucide-react";

const dummyActions = [
  { label: "Add Project", onClick: () => console.log("/Add Project"), icon: <Plus size={16} /> },
  { label: "Add Blog", onClick: () => console.log("/Add Blog"), icon: <FileText size={16} /> },
  { label: "Add User", onClick: () => console.log("/Add User"), icon: <Users size={16} /> },
  { label: "Settings", onClick: () => console.log("/Settings"), icon: <Settings size={16} /> },
];

const QuickActions = ({ actions = dummyActions }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-800">
      <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={a.onClick}
            className="flex items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition hover:bg-black hover:text-white dark:border-gray-700"
          >
            {a.icon}
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
