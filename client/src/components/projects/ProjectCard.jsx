import { Link } from "react-router-dom";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  return (
    <div
      className="group transform overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={project.image || "/placeholder.jpg"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        
        {/* Quick Links on Hover */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white p-2 transition-colors hover:bg-blue-600 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white p-2 transition-colors hover:bg-gray-800 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/projects/${project._id}`}>
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies?.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
            >
              <Tag className="h-3 w-3" />
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
          <Link
            to={`/projects/${project._id}`}
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;