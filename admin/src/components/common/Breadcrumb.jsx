import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  return (
    <div className="text-sm text-gray-500 mb-4">
      {items.map((item, i) => (
        <span key={i}>
          {i !== 0 && " / "}
          {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
