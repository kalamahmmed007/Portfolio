import { useState } from "react";

const Tooltip = ({ children, text }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      {hover && (
        <div className="absolute bottom-full mb-2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
