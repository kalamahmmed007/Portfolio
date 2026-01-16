import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SkillForm from "../../components/forms/SkillForm";
import { api } from "../../services/api";

const ManageSkills = () => {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();

  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchSkill = async () => {
      try {
        const res = await api.get(`/skills/${id}`);
        setSkill(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load skill");
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [id]);

  const handleSuccess = () => navigate("/skills");

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <SkillForm initialData={skill} onSuccess={handleSuccess} />
    </div>
  );
};

export default ManageSkills;
