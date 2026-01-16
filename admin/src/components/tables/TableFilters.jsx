const TableFilters = ({ filters = [], onChange }) => {
  return (
    <div className="flex gap-3">
      {filters.map((f) => (
        <select
          key={f.key}
          onChange={(e) => onChange(f.key, e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All {f.label}</option>
          {f.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default TableFilters;
