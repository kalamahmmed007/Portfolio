import { useState } from "react";

const TagInput = ({ onChange }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter" && input) {
      const updated = [...tags, input];
      setTags(updated);
      setInput("");
      onChange?.(updated);
    }
  };

  return (
    <div className="rounded border p-2">
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((t, i) => (
          <span key={i} className="rounded bg-black px-2 py-1 text-xs text-white">
            {t}
          </span>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder="Press enter to add"
        className="w-full outline-none"
      />
    </div>
  );
};

export default TagInput;
