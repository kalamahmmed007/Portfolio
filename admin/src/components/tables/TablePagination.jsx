const TablePagination = ({ page, totalPages, onChange }) => {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default TablePagination;
