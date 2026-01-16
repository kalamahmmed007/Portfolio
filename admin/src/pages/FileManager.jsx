import { useState } from "react";
import { api } from "../services/api";

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFiles((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-semibold">File Manager</h2>

      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
        className="mb-4"
      />
      {uploading && <p>Uploading...</p>}

      <ul className="space-y-2">
        {files.map((f) => (
          <li key={f._id} className="rounded bg-white p-2 shadow dark:bg-gray-800">
            <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              {f.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileManager;
