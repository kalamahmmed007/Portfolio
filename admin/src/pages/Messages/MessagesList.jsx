import { useState, useEffect, useMemo } from "react";
import TableSearch from "../../components/tables/TableSearch";
import MessagesTable from "../../components/tables/MessagesTable";
import { api } from "../../services/api";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/contacts");
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const filtered = useMemo(
    () =>
      messages.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.email.toLowerCase().includes(search.toLowerCase())
      ),
    [search, messages]
  );

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await api.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete message");
    }
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center text-lg text-gray-500">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex h-64 items-center justify-center text-lg text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
        <TableSearch
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email..."
        />
      </div>

      {/* Messages Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No messages found</div>
        ) : (
          <MessagesTable messages={filtered} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default MessagesList;
