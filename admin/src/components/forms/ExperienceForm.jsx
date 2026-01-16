import React, { useState } from "react";
import { api } from "../../services/api";

const ExperienceForm = ({ experience = null, onSuccess }) => {
  const [title, setTitle] = useState(experience?.title || "");
  const [company, setCompany] = useState(experience?.company || "");
  const [duration, setDuration] = useState(experience?.duration || "");
  const [description, setDescription] = useState(experience?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (experience) {
        await api.put(`/experience/${experience._id}`, { title, company, duration, description });
      } else {
        await api.post("/experience", { title, company, duration, description });
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
        {experience ? "Edit Experience" : "Add New Experience"}
      </h2>

      {error && <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Jan 2022 - Dec 2022"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? (experience ? "Updating..." : "Saving...") : experience ? "Update Experience" : "Add Experience"}
        </button>
      </form>
    </div>
  );
};

export default ExperienceForm;
