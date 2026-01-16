import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EducationForm from "../../components/forms/EducationForm";
import { api } from "../../services/api";

const ManageEducation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [education, setEducation] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchEducation = async () => {
      try {
        const res = await api.get(`/education/${id}`);
        setEducation(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load education");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [id]);

  const handleSuccess = () => navigate("/education");

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <EducationForm initialData={education} onSuccess={handleSuccess} />
    </div>
  );
};

export default ManageEducation;
