const RichTextEditor = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input h-40"
      placeholder="Write something..."
    />
  );
};

export default RichTextEditor;
