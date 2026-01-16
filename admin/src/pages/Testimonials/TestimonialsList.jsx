import { useState, useEffect, useMemo } from "react";
import TableSearch from "../../components/tables/TableSearch";
import ProjectsTable from "../../components/tables/ProjectsTable"; // can make TestimonialsTable later
import EditModal from "../../components/modals/EditModal";
import { Plus } from "lucide-react";
import TestimonialForm from "../../components/forms/TestimonialForm";
import { api } from "../../services/api";

const TestimonialsList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get("/testimonials");
        setTestimonials(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const filtered = useMemo(
    () =>
      testimonials.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, testimonials]
  );

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/testimonials", data);
      setTestimonials((prev) => [...prev, res.data]);
      setAdding(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add testimonial");
    }
  };

  const handleEdit = async (id, data) => {
    try {
      const res = await api.put(`/testimonials/${id}`, data);
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update testimonial");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete testimonial");
    }
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <TableSearch value={search} onChange={setSearch} />

      {/* replace with TestimonialsTable if needed */}
      <ProjectsTable
        projects={filtered} // temporarily reusing ProjectsTable
        onEdit={(row) => setEditing(row)}
        onDelete={handleDelete}
      />

      <EditModal open={adding} title="Add Testimonial" onClose={() => setAdding(false)}>
        <TestimonialForm onSuccess={handleAdd} />
      </EditModal>

      <EditModal open={!!editing} title="Edit Testimonial" onClose={() => setEditing(null)}>
        <TestimonialForm
          initialData={editing}
          onSuccess={(data) => handleEdit(editing._id, data)}
        />
      </EditModal>
    </div>
  );
};

export default TestimonialsList;
