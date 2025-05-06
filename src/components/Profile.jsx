import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EditProfileForm from "./forms/EditProfile";
import { RiHomeGearLine, RiHomeHeartLine } from "react-icons/ri";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { useHandleLogout } from "../hooks/useHandleLogout";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

  const handleEditProfileClick = () => setShowForm((prev) => !prev);

  const handleLogout = useHandleLogout();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto">
      {isAuthenticated ? (
        <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center space-y-6 relative">
          {/* Avatar */}
          <img
            src={
              user?.avatar?.url ||
              "https://plus.unsplash.com/premium_photo-1682308170035-ec5ef069ee10?w=1400&auto=format&fit=crop&q=60"
            }
            alt={user?.avatar?.alt || "Avatar"}
            className="h-32 w-32 rounded-full border-4 border-gray-300 object-cover shadow-md"
          />

          {/* Name */}
          <h1 className="text-3xl font-semibold text-gray-800">{user?.name}</h1>

          {/* Role */}
          <h2 className="body-3 text-gray-500 uppercase tracking-wide font-medium">
            {user?.venueManager ? "Venue Manager" : "Customer"}
          </h2>

          {/* Bio */}
          <p className="text-gray-600 max-w-md text-base leading-relaxed">
            {user?.bio || "No bio provided."}
          </p>

          {/* Edit Button */}
          <button
            onClick={handleEditProfileClick}
            className="button-primary-style flex items-center justify-center gap-2"
          >
            <FaUserEdit />
            {showForm ? "Close" : "Edit Profile"}
          </button>

          {/* Edit Form */}
          {showForm && (
            <div ref={formRef} className="w-full mt-6">
              <EditProfileForm onClose={() => setShowForm(false)} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6">
            {user?.venueManager ? (
              <Link
                to="/manager"
                className="button-secondary-style flex items-center justify-center gap-2"
              >
                <RiHomeGearLine className="text-lg" />
                Manage Venues
              </Link>
            ) : (
              <Link
                to="/bookings"
                className="button-secondary-style flex items-center justify-center gap-2"
              >
                <RiHomeHeartLine className="text-lg" />
                My Bookings
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-12 py-2 border-2 border-color-error text-color-error hover:text-color-error-accent hover:border-color-error-accent hover:shadow-lg rounded-md bg-white"
            >
              <FaSignOutAlt className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <p className="text-gray-600">
            You need an account to view your profile.
          </p>
          <Link
            to="/register"
            className="text-color-accent font-medium underline hover:text-color-accent-hover"
          >
            Register here
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
