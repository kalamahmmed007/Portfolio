import { useState, useEffect, useMemo } from "react";
import TableSearch from "../../components/tables/TableSearch";
import ProjectsTable from "../../components/tables/ProjectsTable"; // replace with BlogTable later
import EditModal from "../../components/modals/EditModal";
import { Plus } from "lucide-react";
import BlogForm from "../../components/forms/BlogForm";
import { api } from "../../services/api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = useMemo(
    () =>
      blogs.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search, blogs]
  );

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/blogs", data);
      setBlogs((prev) => [...prev, res.data]);
      setAdding(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add blog");
    }
  };

  const handleEdit = async (id, data) => {
    try {
      const res = await api.put(`/blogs/${id}`, data);
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? res.data : b))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update blog");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete blog");
    }
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Blogs</h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add Blog
        </button>
      </div>

      <TableSearch value={search} onChange={setSearch} />

      {/* replace with BlogTable later */}
      <ProjectsTable
        projects={filtered}
        onEdit={(row) => setEditing(row)}
        onDelete={handleDelete}
      />

      <EditModal open={adding} title="Add Blog" onClose={() => setAdding(false)}>
        <BlogForm onSuccess={handleAdd} />
      </EditModal>

      <EditModal open={!!editing} title="Edit Blog" onClose={() => setEditing(null)}>
        <BlogForm
          initialData={editing}
          onSuccess={(data) => handleEdit(editing._id, data)}
        />
      </EditModal>
    </div>
  );
};

export default BlogList;
