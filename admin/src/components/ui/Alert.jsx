const Alert = ({ type = "info", children }) => {
  const colors = {
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  return <div className={`p-3 rounded ${colors[type]}`}>{children}</div>;
};

export default Alert;
