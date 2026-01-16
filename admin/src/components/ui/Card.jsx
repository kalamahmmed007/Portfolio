const Card = ({ children, className }) => (
  <div className={`bg-white p-4 rounded-xl shadow ${className}`}>
    {children}
  </div>
);

export default Card;
