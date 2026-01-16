import { useState, useEffect } from "react";
import SkillCard from "./SkillCard";
import { Code, Database, Palette, Server } from "lucide-react";

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch skills from API
    const fetchSkills = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch("/api/skills");
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        // Demo data if API fails
        setSkills([
          { id: 1, name: "React", level: 90, category: "frontend", icon: "⚛️" },
          { id: 2, name: "Node.js", level: 85, category: "backend", icon: "🟢" },
          { id: 3, name: "Tailwind CSS", level: 95, category: "frontend", icon: "🎨" },
          { id: 4, name: "MongoDB", level: 80, category: "database", icon: "🍃" },
          { id: 5, name: "JavaScript", level: 92, category: "frontend", icon: "📜" },
          { id: 6, name: "Express.js", level: 88, category: "backend", icon: "🚂" },
          { id: 7, name: "MySQL", level: 75, category: "database", icon: "🐬" },
          { id: 8, name: "Figma", level: 70, category: "design", icon: "🎨" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = [
    { id: "all", name: "All Skills", icon: Code },
    { id: "frontend", name: "Frontend", icon: Palette },
    { id: "backend", name: "Backend", icon: Server },
    { id: "database", name: "Database", icon: Database },
  ];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            My Skills
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-blue-600"></div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow"
                }`}
              >
                <Icon className="h-5 w-5" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-500">No skills found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;