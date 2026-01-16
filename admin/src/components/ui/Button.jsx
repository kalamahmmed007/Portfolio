const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
