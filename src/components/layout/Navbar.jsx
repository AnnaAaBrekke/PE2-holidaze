/**
 * Navbar - A responsive navigation component with a sidebar, user profile access,
 * authentication controls, and contextual links based on user role.
 *
 * @component
 * @returns {JSX.Element} A site-wide navigation bar with conditional rendering based on auth state.
 *
 * Features:
 * - Responsive sidebar toggle for mobile and desktop
 * - Displays user name, avatar, and role when authenticated
 * - Navigation links adapt based on user role (manager/customer)
 * - Includes login/register buttons or logout action
 * - Uses `react-router-dom` for navigation and route matching
 */

import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const linkClasses = (path) => {
    const isHome = path === "/";
    const isActive = isHome
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

    return `flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 p-2 rounded transition-all ${
      isActive
        ? "font-bold text-color-primary border-l-4 border-color-primary sm:pl-2 bg-color-background"
        : "text-color-text-primary hover:text-color-primary"
    }`;
  };

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Left Nav */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar navigation"
          >
            <GoSidebarCollapse className="size-6 hover:size-8" />
          </button>
        </div>

        {/* Centered Logo */}
        <div className="flex-1 flex justify-center sm:justify-center text-lg font-bold text-yellow-600">
          <Link to="/">
            <img
              src="/logo_holidaze.png"
              alt="Logo Holidaze"
              className="w-16 p-0.5 rounded-lg h-auto hover:shadow-md"
            />
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="text-right">
                <h5 className="font-semibold text-gray-800">{user?.name}</h5>
                <p className="body-3 text-gray-500">
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
              <Link to="/login" className="body-3 button-secondary-style">
                Login
              </Link>
              <Link
                to="/register"
                className="body-3 bg-[#0E4551] button-secondary-style"
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
          aria-label="Close sidebar navigation"
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Sidebar Content */}
        <div className="mt-12 flex-1 flex flex-col overflow-y-auto">
          {isAuthenticated && (
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={user?.avatar.url}
                alt={user?.avatar.alt}
                className="rounded-full w-12 h-12 sm:w-24 sm:h-24 object-cover mb-2 sm:mb-4"
              />
              <div className="hidden sm:flex flex-col items-center">
                <h5 className="font-semibold text-gray-800">{user?.name}</h5>
                <p className="body-3 text-gray-500">
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
                handleLogout();
                setSidebarOpen(false);
              }}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start pl-6 gap-1 sm:gap-2 text-color-error hover:text-color-error-accent text-md"
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
