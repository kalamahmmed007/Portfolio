import { useState, useEffect, useMemo } from "react";
import TableSearch from "../../components/tables/TableSearch";
import ProjectsTable from "../../components/tables/ProjectsTable"; // can create SkillsTable separately
import EditModal from "../../components/modals/EditModal";
import SkillForm from "../../components/forms/SkillForm";
import { Plus } from "lucide-react";
import { api } from "../../services/api";

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/skills");
        setSkills(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filtered = useMemo(
    () =>
      skills.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, skills]
  );

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/skills", data);
      setSkills((prev) => [...prev, res.data]);
      setAdding(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add skill");
    }
  };

  const handleEdit = async (id, data) => {
    try {
      const res = await api.put(`/skills/${id}`, data);
      setSkills((prev) =>
        prev.map((s) => (s._id === id ? res.data : s))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update skill");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete skill");
    }
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Skills</h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      <TableSearch value={search} onChange={setSearch} />

      {/* replace with a SkillsTable component if needed */}
      <ProjectsTable
        projects={filtered} // treat skills as "projects" temporarily or create SkillsTable
        onEdit={(row) => setEditing(row)}
        onDelete={handleDelete}
      />

      <EditModal open={adding} title="Add Skill" onClose={() => setAdding(false)}>
        <SkillForm onSuccess={handleAdd} />
      </EditModal>

      <EditModal open={!!editing} title="Edit Skill" onClose={() => setEditing(null)}>
        <SkillForm
          initialData={editing}
          onSuccess={(data) => handleEdit(editing._id, data)}
        />
      </EditModal>
    </div>
  );
};

export default SkillsList;
