import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TestimonialForm from "../../components/forms/TestimonialForm";
import { api } from "../../services/api";

const ManageTestimonials = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchTestimonial = async () => {
      try {
        const res = await api.get(`/testimonials/${id}`);
        setTestimonial(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load testimonial");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  const handleSuccess = () => navigate("/testimonials");

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <TestimonialForm initialData={testimonial} onSuccess={handleSuccess} />
    </div>
  );
};

export default ManageTestimonials;
