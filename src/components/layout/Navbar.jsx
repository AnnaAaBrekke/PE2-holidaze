import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {
  FaArrowLeft,
  FaHome,
  FaInfoCircle,
  FaUser,
  FaSignOutAlt,
  FaRegUser,
} from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";
import { RiHomeGearLine, RiHomeHeartLine } from "react-icons/ri";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const linkClasses = (path) => {
    const isHome = path === "/";
    const isActive = isHome
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

    return `flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 p-2 rounded transition-all ${
      isActive
        ? "font-bold text-blue-600 border-l-4 border-blue-600 sm:pl-2 bg-blue-50"
        : "text-gray-700 hover:text-blue-600"
    }`;
  };

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Left Nav */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}>
            <GoSidebarCollapse className="size-6 hover:size-8" />
          </button>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-yellow-600">
          <Link to="/">
            <img
              src="/logo_holidaze.png"
              className="w-16 rounded-full h-auto"
            />
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="text-right">
                <h5 className="font-semibold text-gray-800">{user?.name}</h5>
                <p className="text-sm text-gray-500">
                  {user?.venueManager ? "Venue Manager" : "Customer"}
                </p>
              </div>
              <Link to="/profile">
                <img
                  src={user?.avatar.url}
                  alt={user?.avatar.alt}
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:shadow-xl object-cover"
                />
              </Link>
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

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-20 sm:w-64 bg-white shadow-lg z-50 p-2 sm:p-6 transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Sidebar Content */}
        <div className="mt-12 flex-1 flex flex-col overflow-y-auto">
          {/* Profile Card */}
          {isAuthenticated && (
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={user?.avatar.url}
                alt={user?.avatar.alt}
                className="rounded-full w-12 h-12 sm:w-24 sm:h-24 object-cover mb-2 sm:mb-4"
              />
              <div className="hidden sm:flex flex-col items-center">
                <h5 className="font-semibold text-gray-800">{user?.name}</h5>
                <p className="text-sm text-gray-500">
                  {user?.venueManager ? "Venue Manager" : "Customer"}
                </p>
              </div>

              <div className="mt-4 w-full space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setSidebarOpen(false)}
                  className={linkClasses("/profile")}
                >
                  <FaRegUser className="size-5" />
                  <span className="hidden sm:inline">View Profile</span>
                </Link>
                {user?.venueManager && (
                  <Link
                    to="/manager"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses("/manager")}
                  >
                    <RiHomeGearLine className="size-5" />
                    <span className="hidden sm:inline">Venues</span>
                  </Link>
                )}
                <Link
                  to="/bookings"
                  onClick={() => setSidebarOpen(false)}
                  className={linkClasses("/bookings")}
                >
                  <RiHomeHeartLine className="size-5" />
                  <span className="hidden sm:inline">My Bookings</span>
                </Link>
              </div>
            </div>
          )}

          {/* General Navigation */}
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className={linkClasses("/")}
              >
                <FaHome className="size-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setSidebarOpen(false)}
                className={linkClasses("/about")}
              >
                <FaInfoCircle className="size-5" />
                <span className="hidden sm:inline">About Us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer: Logout or Create Account */}
        <div className="mt-auto pt-6 border-t mb-2">
          {!isAuthenticated ? (
            <Link
              to="/register"
              onClick={() => setSidebarOpen(false)}
              className={linkClasses("/register")}
            >
              <FaUser className="size-5" />
              <span className="hidden sm:inline">Create Account</span>
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start pl-6 gap-1 sm:gap-2 text-red-600 hover:text-red-800 text-md"
            >
              <FaSignOutAlt className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
