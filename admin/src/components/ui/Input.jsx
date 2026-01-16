const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${className}`}
  />
);

export default Input;
