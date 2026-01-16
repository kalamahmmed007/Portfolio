import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BlogForm from "../../components/forms/BlogForm";
import { api } from "../../services/api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSuccess = () => navigate("/blogs");

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <h2 className="mb-6 text-2xl font-semibold">Edit Blog</h2>
      <BlogForm initialData={blog} onSuccess={handleSuccess} />
    </div>
  );
};

export default EditBlog;
