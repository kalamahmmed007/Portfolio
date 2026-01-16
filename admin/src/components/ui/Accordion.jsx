import { useState } from "react";

const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border">
          <button
            className="w-full px-4 py-2 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.title}
          </button>
          {openIndex === i && <div className="p-4">{item.content}</div>}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
