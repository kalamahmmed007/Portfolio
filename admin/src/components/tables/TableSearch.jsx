const TableSearch = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
      className="w-64 rounded-lg border px-3 py-2"
    />
  );
};

export default TableSearch;
