import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";

const ProjectFilter = ({ onFilterChange, onSearchChange }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "design", name: "UI/UX Design" },
    { id: "other", name: "Others" },
  ];

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    onFilterChange(categoryId);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchTerm("");
    onFilterChange("all");
    onSearchChange("");
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 lg:hidden"
        >
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      {/* Category Filters */}
      <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
          
          {(activeCategory !== "all" || searchTerm) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;