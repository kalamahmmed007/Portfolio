const Button = ({ children, onClick, variant = "primary", type = "button" }) => {
  const base =
    "rounded-lg px-5 py-2 font-medium transition focus:outline-none";

  const variants = {
    primary: "bg-black text-white hover:opacity-90",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
