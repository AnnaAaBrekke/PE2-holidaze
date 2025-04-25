import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {
  FaArrowLeft,
  FaHome,
  FaInfoCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";
import { BiSolidHome } from "react-icons/bi";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Left Nav */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}>
            <GoSidebarCollapse className="size-6 hover:size-8" />
          </button>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-yellow-600">
          <Link to="/">Holidaze</Link>
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
                  className="rounded-full w-12 h-12 hover:shadow-xl"
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
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
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

        {/* Content */}
        <div className="mt-12">
          {/* Profile Card */}
          {isAuthenticated && (
            <div className="bg-gray-100 p-4 rounded-lg shadow mb-6 flex flex-col items-center text-center">
              <img
                src={user?.avatar.url}
                alt={user?.avatar.alt}
                className="rounded-full w-24 h-24 mb-3 object-cover"
              />
              <h5 className="font-semibold text-gray-800">{user?.name}</h5>
              <p className="text-sm text-gray-500 mb-4">
                {user?.venueManager ? "Venue Manager" : "Customer"}
              </p>

              {/* Profile action links */}
              <div className="w-full space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <FaUser /> View Profile
                </Link>
                {user?.venueManager && (
                  <Link
                    to="/manager"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                  >
                    <BiSolidHome /> My Venues
                  </Link>
                )}
                <Link
                  to="/bookings"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <BiSolidHome /> My Bookings
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
                className="flex pl-4 items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setSidebarOpen(false)}
                className="flex pl-4 items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaInfoCircle /> About Us
              </Link>
            </li>
          </ul>

          {!isAuthenticated && (
            <div className="mt-4">
              <Link
                to="/register"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm"
              >
                <FaUser /> Create Account
              </Link>
            </div>
          )}
        </div>

        {/* Logout at the very bottom */}
        {isAuthenticated && (
          <button
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
            className="flex items-center pl-4 gap-2 text-red-600 hover:text-red-800 text-md mt-6"
          >
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
