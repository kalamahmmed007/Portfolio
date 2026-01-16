import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ExperienceForm from "../../components/forms/ExperienceForm";
import { api } from "../../services/api";

const ManageExperience = () => {
  const { id } = useParams(); // for edit
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchExperience = async () => {
      try {
        const res = await api.get(`/experiences/${id}`);
        setExperience(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load experience");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const handleSuccess = () => navigate("/experience");

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <ExperienceForm initialData={experience} onSuccess={handleSuccess} />
    </div>
  );
};

export default ManageExperience;
