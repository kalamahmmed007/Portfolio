import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const StatsCard = ({ icon, label, number, color = "bg-white", change, trend = "up" }) => {
  return (
    <div className={`flex flex-col justify-between rounded-xl p-4 shadow ${color}`}>
      <div className="flex items-center justify-between">
        <div className="text-2xl">{icon}</div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xl font-semibold text-gray-800">{number}</p>
        {change && (
          <div className={`flex items-center text-sm font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {trend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
