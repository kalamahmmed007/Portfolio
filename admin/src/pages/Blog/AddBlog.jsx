import BlogForm from "../../components/forms/BlogForm";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const AddBlog = () => {
  const navigate = useNavigate();

  const handleSuccess = () => navigate("/blogs");

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <h2 className="mb-6 text-2xl font-semibold">Add New Blog</h2>
      <BlogForm onSuccess={handleSuccess} />
    </div>
  );
};

export default AddBlog;
