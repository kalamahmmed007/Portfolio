const Toast = ({ message }) => (
  <div className="fixed bottom-5 right-5 rounded-lg bg-black px-4 py-2 text-white shadow">
    {message}
  </div>
);

export default Toast;
