import { Link } from "react-router-dom";
import NotFoundGif from "../assets/icons/notfound.gif"; // make sure the path & filename are exact

const NotFound = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
      <Link to="/dashboard">
        <img
          src={NotFoundGif}
          alt="Page Not Found"
          className="h-40 w-40 cursor-pointer object-contain transition-transform hover:scale-105 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
        />
      </Link>
    </div>
  );
};

export default NotFound;
