
import { ExternalLink, Github, Calendar, Tag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectDetail = ({ project }) => {
  if (!project) return null;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Project Image */}
      <div className="relative h-96 bg-gray-200">
        <img
          src={project.image || "/placeholder.jpg"}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <Link
          to="/projects"
          className="absolute left-6 top-6 flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Projects
        </Link>

        {/* Action Buttons */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <ExternalLink className="h-5 w-5" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-900"
            >
              <Github className="h-5 w-5" />
              Source Code
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              {project.category}
            </span>
            {project.featured && (
              <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                Featured Project
              </span>
            )}
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {project.title}
          </h1>
          
          <p className="text-lg text-gray-600">
            {project.description}
          </p>
        </div>

        {/* Full Description */}
        {project.fullDescription && (
          <div className="prose mb-8 max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">About this Project</h2>
            <div className="whitespace-pre-line leading-relaxed text-gray-700">
              {project.fullDescription}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies?.map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-800"
              >
                <Tag className="h-4 w-4" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Key Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    ✓
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Project Gallery</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="h-64 w-full rounded-lg object-cover shadow-md transition-shadow hover:shadow-xl"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;