import { useEffect, useState } from "react";

const SkillProgress = ({ level, isHovered }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(level);
    }, 100);

    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="relative">
      {/* Background Bar */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        {/* Progress Bar */}
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            level >= 90
              ? "bg-gradient-to-r from-green-400 to-green-600"
              : level >= 70
              ? "bg-gradient-to-r from-blue-400 to-blue-600"
              : "bg-gradient-to-r from-yellow-400 to-yellow-600"
          } ${isHovered ? "animate-pulse" : ""}`}
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer Effect */}
          <div className="animate-shimmer h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>
      </div>

      {/* Percentage Labels */}
      <div className="mt-1 flex justify-between text-xs text-gray-500">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default SkillProgress;