import { useState, useEffect, useMemo } from "react";
import TableSearch from "../../components/tables/TableSearch";
import ProjectsTable from "../../components/tables/ProjectsTable"; // can create ExperienceTable separately
import EditModal from "../../components/modals/EditModal";
import { Plus } from "lucide-react";
import ExperienceForm from "../../components/forms/ExperienceForm";
import { api } from "../../services/api";

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await api.get("/experiences");
        setExperiences(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load experiences");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const filtered = useMemo(
    () =>
      experiences.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search, experiences]
  );

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/experiences", data);
      setExperiences((prev) => [...prev, res.data]);
      setAdding(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add experience");
    }
  };

  const handleEdit = async (id, data) => {
    try {
      const res = await api.put(`/experiences/${id}`, data);
      setExperiences((prev) =>
        prev.map((e) => (e._id === id ? res.data : e))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update experience");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/experiences/${id}`);
      setExperiences((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete experience");
    }
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Experience</h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <TableSearch value={search} onChange={setSearch} />

      {/* replace with a ExperienceTable component if needed */}
      <ProjectsTable
        projects={filtered} // temporarily reusing ProjectsTable
        onEdit={(row) => setEditing(row)}
        onDelete={handleDelete}
      />

      <EditModal open={adding} title="Add Experience" onClose={() => setAdding(false)}>
        <ExperienceForm onSuccess={handleAdd} />
      </EditModal>

      <EditModal open={!!editing} title="Edit Experience" onClose={() => setEditing(null)}>
        <ExperienceForm
          initialData={editing}
          onSuccess={(data) => handleEdit(editing._id, data)}
        />
      </EditModal>
    </div>
  );
};

export default ExperienceList;
