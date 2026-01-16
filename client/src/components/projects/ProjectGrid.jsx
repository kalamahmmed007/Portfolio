import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 rounded-t-lg bg-gray-300"></div>
            <div className="rounded-b-lg bg-white p-6">
              <div className="mb-2 h-4 rounded bg-gray-300"></div>
              <div className="h-3 w-2/3 rounded bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-500">No projects found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}
    </div>
  );
};

export default ProjectGrid;
