// src/pages/Settings/SocialMedia.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const SocialMedia = () => {
  const [links, setLinks] = useState({ facebook: "", twitter: "", linkedin: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch social links on mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await api.get("/settings/social");
        setLinks(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load social links");
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  // Save updated links
  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/settings/social", links);
      alert("Social media links updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update links");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="mt-10 text-center text-gray-600">Loading...</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-8">
      <h2 className="text-3xl font-semibold">Social Media Settings</h2>

      <div className="space-y-6">
        {/* Social inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 flex items-center gap-2 text-gray-700">
              <FaFacebookF className="text-blue-600" /> Facebook URL
            </label>
            <input
              type="url"
              placeholder="https://facebook.com/yourpage"
              value={links.facebook}
              onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
              className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-gray-700">
              <FaTwitter className="text-blue-400" /> Twitter URL
            </label>
            <input
              type="url"
              placeholder="https://twitter.com/yourhandle"
              value={links.twitter}
              onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
              className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-gray-700">
              <FaLinkedinIn className="text-blue-700" /> LinkedIn URL
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={links.linkedin}
              onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
              className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-blue-700"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border px-6 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
