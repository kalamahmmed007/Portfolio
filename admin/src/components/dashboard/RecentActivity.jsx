import React from "react";
import { UserPlus, FileText, MessageCircle, Star } from "lucide-react";

const dummyActivities = [
  { text: "New user registered", time: "2m ago", icon: <UserPlus size={16} className="text-blue-500" /> },
  { text: "Project 'Portfolio Website' updated", time: "10m ago", icon: <FileText size={16} className="text-green-500" /> },
  { text: "Blog 'React Tips' published", time: "30m ago", icon: <FileText size={16} className="text-yellow-500" /> },
  { text: "New message from John Doe", time: "1h ago", icon: <MessageCircle size={16} className="text-purple-500" /> },
  { text: "Skill 'Node.js' added", time: "2h ago", icon: <Star size={16} className="text-red-500" /> },
];

const RecentActivity = ({ activities = dummyActivities }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-800">
      <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">
        Recent Activity
      </h3>

      <ul className="space-y-3">
        {activities.map((a, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200"
          >
            <div className="flex items-center gap-2">
              {a.icon}
              <span>{a.text}</span>
            </div>
            <span className="text-gray-400 dark:text-gray-400">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
