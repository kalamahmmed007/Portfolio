import { Link } from "react-router-dom";
import NotFoundGif from "../assets/icons/notfound.gif";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <Link to="/">
        <img
          src={NotFoundGif}
          alt="404 Not Found"
          className="h-40 w-40 cursor-pointer object-contain transition-transform hover:scale-105 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-96 lg:w-96"
        />
      </Link>
    </div>
  );
};

export default NotFound;
