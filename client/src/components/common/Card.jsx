const Card = ({ children }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
      {children}
    </div>
  );
};

export default Card;
