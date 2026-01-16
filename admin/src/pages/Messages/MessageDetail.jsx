import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const MessageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get(`/messages/${id}`);
        setMessage(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load message");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [id]);

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  if (!message) return <div className="mt-10 text-center">Message not found</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold">{message.subject}</h2>
      <p className="text-gray-600"><strong>From:</strong> {message.name} ({message.email})</p>
      <p className="text-gray-600"><strong>Received:</strong> {new Date(message.createdAt).toLocaleString()}</p>
      <div className="mt-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <p>{message.body}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
      >
        Back
      </button>
    </div>
  );
};

export default MessageDetail;
