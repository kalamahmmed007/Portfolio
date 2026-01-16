const Select = ({ className, children, ...props }) => (
  <select
    {...props}
    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${className}`}
  >
    {children}
  </select>
);

export default Select;
