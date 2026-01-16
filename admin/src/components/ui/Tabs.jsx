import { useState } from "react";

const Tabs = ({ tabs = [] }) => {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mb-4 flex gap-2 border-b">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-t-lg ${i === active ? "bg-black text-white" : "text-gray-500"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
};

export default Tabs;
