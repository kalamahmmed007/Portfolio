import React from "react";

const dummyStats = [
  { label: "New Visitors", value: 1200, percent: 60 },
  { label: "Returning Visitors", value: 800, percent: 40 },
  { label: "Page Views", value: 2500, percent: 75 },
  { label: "Sign-ups", value: 300, percent: 30 },
];

const VisitorStats = ({ stats = dummyStats }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-800">
      <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">
        Visitor Stats
      </h3>

      <div className="space-y-3">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="mb-1 flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>
            <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2 rounded bg-black dark:bg-green-500"
                style={{ width: `${s.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorStats;
