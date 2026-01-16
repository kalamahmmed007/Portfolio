import { useState, useRef, useEffect } from "react";

const Dropdown = ({ label, options = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setOpen(!open)} className="rounded-lg border px-3 py-2">
        {label}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-40 rounded border bg-white shadow">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => { onSelect(opt); setOpen(false); }}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
