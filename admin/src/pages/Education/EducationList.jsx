import { useState, useEffect, useMemo } from "react";
import TableSearch from "../../components/tables/TableSearch";
import ProjectsTable from "../../components/tables/ProjectsTable"; // can make EducationTable
import EditModal from "../../components/modals/EditModal";
import { Plus } from "lucide-react";
import EducationForm from "../../components/forms/EducationForm";
import { api } from "../../services/api";

const EducationList = () => {
  const [education, setEducation] = useState([]);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await api.get("/education");
        setEducation(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load education");
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  const filtered = useMemo(
    () =>
      education.filter((e) =>
        e.school.toLowerCase().includes(search.toLowerCase())
      ),
    [search, education]
  );

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/education", data);
      setEducation((prev) => [...prev, res.data]);
      setAdding(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add education");
    }
  };

  const handleEdit = async (id, data) => {
    try {
      const res = await api.put(`/education/${id}`, data);
      setEducation((prev) =>
        prev.map((e) => (e._id === id ? res.data : e))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update education");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/education/${id}`);
      setEducation((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete education");
    }
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add Education
        </button>
      </div>

      <TableSearch value={search} onChange={setSearch} />

      {/* replace with EducationTable if desired */}
      <ProjectsTable
        projects={filtered}
        onEdit={(row) => setEditing(row)}
        onDelete={handleDelete}
      />

      <EditModal open={adding} title="Add Education" onClose={() => setAdding(false)}>
        <EducationForm onSuccess={handleAdd} />
      </EditModal>

      <EditModal open={!!editing} title="Edit Education" onClose={() => setEditing(null)}>
        <EducationForm
          initialData={editing}
          onSuccess={(data) => handleEdit(editing._id, data)}
        />
      </EditModal>
    </div>
  );
};

export default EducationList;
