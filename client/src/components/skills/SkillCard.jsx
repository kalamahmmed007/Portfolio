import { useState } from "react";
import SkillProgress from "./SkillProgress";
import { TrendingUp } from "lucide-react";

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group transform rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{skill.icon}</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
              {skill.name}
            </h3>
            <p className="text-sm capitalize text-gray-500">{skill.category}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{skill.level}%</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp className="h-3 w-3" />
            <span>Growing</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <SkillProgress level={skill.level} isHovered={isHovered} />

      {/* Skill Level Badge */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            skill.level >= 90
              ? "bg-green-100 text-green-700"
              : skill.level >= 70
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {skill.level >= 90 ? "Expert" : skill.level >= 70 ? "Advanced" : "Intermediate"}
        </span>
        
        {/* Optional: Years of Experience */}
        <span className="text-xs text-gray-500">
          {Math.floor(skill.level / 20)}+ years
        </span>
      </div>
    </div>
  );
};

export default SkillCard;