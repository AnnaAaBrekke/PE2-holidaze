import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Nav */}
        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-black font-medium">
            Home
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-black font-medium"
          >
            Profile
          </Link>
          <Link
            to="/bookings"
            className="text-gray-700 hover:text-black font-medium"
          >
            My Bookings
          </Link>
          <Link
            to="/manager"
            className="text-gray-700 hover:text-black font-medium"
          >
            Manager
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-black font-medium"
          >
            About
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user?.name}</span>
              <Link to="/profile" className="btn">
                <img
                  src={user?.avatar.url}
                  alt={user?.avatar.alt}
                  className="rounded-full w-auto h-16"
                />
              </Link>{" "}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
