import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const ProjectForm = ({ project = null, onSuccess }) => {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [techStack, setTechStack] = useState(project?.techStack || "");
  const [link, setLink] = useState(project?.link || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (project) {
        // Update
        await api.put(`/projects/${project._id}`, { title, description, techStack, link });
      } else {
        // Create
        await api.post("/projects", { title, description, techStack, link });
      }
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {project ? "Edit Project" : "Add New Project"}
      </h2>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Tech Stack</label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            placeholder="React, Node.js, Tailwind..."
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Project Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            placeholder="https://example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? (project ? "Updating..." : "Saving...") : project ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
