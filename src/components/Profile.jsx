import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EditProfileForm from "./forms/EditProfile";
import { RiHomeGearLine, RiHomeHeartLine } from "react-icons/ri";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import "../styles/button.css";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

  const handleEditProfileClick = () => setShowForm((prev) => !prev);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {isAuthenticated ? (
        <div className="flex flex-col items-center text-center bg-color-background p-8 rounded-xl shadow-lg">
          {/* Avatar */}
          <img
            src={
              user?.avatar?.url ||
              "https://plus.unsplash.com/premium_photo-1682308170035-ec5ef069ee10?w=1400&auto=format&fit=crop&q=60"
            }
            alt={user?.avatar?.alt || "Avatar"}
            className="h-32 w-32 rounded-full border-2 border-color-primary mb-4 object-cover"
          />

          {/* Name */}
          <h2 className="text-2xl font-bold text-color-text-primary">
            {user?.name}
          </h2>

          {/* Role */}
          <h3 className="text-sm text-color-secondary mb-2">
            {user?.venueManager ? "Venue Manager" : "Customer"}
          </h3>

          {/* Bio */}
          <p
            className="text-color-text-secondary text-sm mb-6 max-w-sm
          "
          >
            {user?.bio || "No bio provided."}
          </p>

          {/* Edit Profile Button */}

          <button
            onClick={handleEditProfileClick}
            className="button-primary-style flex items-center gap-2"
          >
            <FaUserEdit />
            {showForm ? "Close" : "Edit Profile"}
          </button>

          {/* Form */}
          {showForm && (
            <div ref={formRef} className="w-full">
              <EditProfileForm onClose={() => setShowForm(false)} />
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col items-center gap-4 mt-4 w-full">
            {user?.venueManager ? (
              <Link
                to="/manager"
                className="flex flex-row items-center gap-2 button-secondary-style"
              >
                <RiHomeGearLine className="text-lg" />
                Manage Venues
              </Link>
            ) : (
              <Link
                to="/bookings"
                className="flex flex-row items-center gap-2 button-secondary-style"
              >
                <RiHomeHeartLine className="text-lg" />
                My Bookings
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={logout}
              className="flex flex-row items-center gap-2 px-4 py-2 border border-red-600 text-red-600 hover:text-red-800 hover:border-red-800 rounded transition duration-200 ease-in-out"
            >
              <FaSignOutAlt className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center mt-3">
          Create a profile?
          <Link to="/register" className="text-color-secondary hover:underline">
            <br />
            Register here
          </Link>
        </p>
      )}
    </div>
  );
};

export default Profile;
