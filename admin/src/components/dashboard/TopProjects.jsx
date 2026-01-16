import React from "react";

const dummyProjects = [
  { name: "Portfolio Website", views: 1200 },
  { name: "E-commerce App", views: 980 },
  { name: "Chat App", views: 850 },
  { name: "Blog Platform", views: 670 },
  { name: "Task Manager", views: 540 },
];

const TopProjects = ({ projects = dummyProjects }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-800">
      <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">
        Top Projects
      </h3>

      <ul className="space-y-3">
        {projects.map((p, i) => (
          <li
            key={i}
            className="flex justify-between border-b pb-2 text-sm text-gray-700 last:border-none dark:text-gray-200"
          >
            <span>{p.name}</span>
            <span className="font-medium">{p.views}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProjects;
