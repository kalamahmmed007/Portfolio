const PreviewModal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">{title}</h3>

        <div className="max-h-[60vh] overflow-y-auto">
          {children}
        </div>

        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PreviewModal;
