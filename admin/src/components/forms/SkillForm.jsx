import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const SkillForm = ({ skill = null, onSuccess }) => {
  const [name, setName] = useState(skill?.name || "");
  const [level, setLevel] = useState(skill?.level || 0);
  const [category, setCategory] = useState(skill?.category || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (skill) {
        await api.put(`/skills/${skill._id}`, { name, level, category });
      } else {
        await api.post("/skills", { name, level, category });
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
        {skill ? "Edit Skill" : "Add New Skill"}
      </h2>

      {error && <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Skill Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            placeholder="Frontend, Backend, DevOps..."
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">Proficiency Level (%)</label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            min="0"
            max="100"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? (skill ? "Updating..." : "Saving...") : skill ? "Update Skill" : "Add Skill"}
        </button>
      </form>
    </div>
  );
};

export default SkillForm;
