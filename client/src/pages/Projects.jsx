import { useState, useEffect } from "react";
import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectFilter from "../components/projects/ProjectFilter";
import { Briefcase } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        
        if (!response.ok) throw new Error("Failed to fetch projects");
        
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = projects;

    // Filter by category
    if (activeFilter !== "all") {
      result = result.filter((project) => project.category === activeFilter);
    }

    // Search by title or description
    if (searchTerm) {
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(result);
  }, [activeFilter, searchTerm, projects]);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Briefcase className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              My Projects
            </h1>
          </div>
          <div className="mx-auto mb-6 h-1 w-24 bg-blue-600"></div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore my portfolio of work, from web applications to mobile apps and design projects
          </p>
        </div>

        {/* Filter */}
        <ProjectFilter
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />

        {/* Projects Grid */}
        <ProjectGrid projects={filteredProjects} loading={loading} />

        {/* Results Count */}
        {!loading && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
