import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../../components/forms/ProjectForm";
import { api } from "../../services/api";

const EditProject = () => {
  const { id } = useParams(); // get project ID from URL
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleSuccess = () => {
    navigate("/projects"); // redirect back to Projects List
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <ProjectForm initialData={project} onSuccess={handleSuccess} />
    </div>
  );
};

export default EditProject;
