import { useState, useEffect, useMemo } from "react";
import ProjectsTable from "../../components/tables/ProjectsTable";
import TableSearch from "../../components/tables/TableSearch";
import { Plus } from "lucide-react";
import ProjectForm from "../../components/forms/ProjectForm";
import EditModal from "../../components/modals/EditModal";
import { api } from "../../services/api";
import { projectService } from "../../services/projectService";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  // fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // filter projects by search
  const filtered = useMemo(
    () =>
      projects.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search, projects]
  );

  // handle add
  const handleAdd = async (data) => {
    try {
      const res = await api.post("/projects", data);
      setProjects((prev) => [...prev, res.data]);
      setAdding(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add project");
    }
  };

  // handle edit
  const handleEdit = async (id, data) => {
    try {
      const res = await api.put(`/projects/${id}`, data);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update project");
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete project");
    }
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      {/* header + add button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* search */}
      <TableSearch value={search} onChange={setSearch} />

      {/* projects table */}
      <ProjectsTable
        projects={filtered}
        onEdit={(row) => setEditing(row)}
        onDelete={handleDelete}
      />

      {/* add modal */}
      <EditModal
        open={adding}
        title="Add Project"
        onClose={() => setAdding(false)}
      >
        <ProjectForm onSuccess={handleAdd} />
      </EditModal>

      {/* edit modal */}
      <EditModal
        open={!!editing}
        title="Edit Project"
        onClose={() => setEditing(null)}
      >
        <ProjectForm
          initialData={editing}
          onSuccess={(data) => handleEdit(editing._id, data)}
        />
      </EditModal>
    </div>
  );
};

export default ProjectsList;
