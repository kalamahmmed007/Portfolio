const Badge = ({ children, className }) => (
  <span className={`bg-black text-white text-xs px-2 py-1 rounded ${className}`}>
    {children}
  </span>
);

export default Badge;
