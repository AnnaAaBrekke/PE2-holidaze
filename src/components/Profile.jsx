import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EditProfileForm from "./forms/EditProfile";
import { useEffect, useState, useRef } from "react";
import { RiHomeGearLine, RiHomeHeartLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

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
    <div className="mt-12 flex-1 flex flex-col overflow-y-auto">
      {isAuthenticated ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow mb-6 flex flex-col items-center text-center">
          <img
            src={
              user?.avatar?.url ||
              "https://plus.unsplash.com/premium_photo-1682308170035-ec5ef069ee10?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGF2YXRhciUyMGZha2V8ZW58MHx8MHx8fDA%3D"
            }
            alt={user?.avatar?.alt || "Avatar"}
            className="h-32 w-32 rounded-full"
          />
          <h2 className="font-semibold text-gray-800">{user?.name}</h2>
          <h3 className="text-sm text-gray-500 mb-4">
            {user?.venueManager ? "Venue Manager" : "Customer"}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {user?.bio || "Bio placeholder.."}
          </p>

          <button
            onClick={handleEditProfileClick}
            className="w-full bg-[#0F6474] text-white font-podkova text-lg font-semibold py-1 rounded-lg hover:bg-[#0c4e5a] transition"
          >
            {showForm ? "Close" : "Edit Profile"}
          </button>

          {showForm && (
            <div
              ref={formRef}
              className="transition-all duration-500 ease-in-out animate-fade-in"
            >
              <EditProfileForm onClose={() => setShowForm(false)} />
            </div>
          )}

          {user?.venueManager ? (
            <Link
              to="/manager"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <RiHomeGearLine className="size-5" /> Venues
            </Link>
          ) : (
            <Link
              to="/bookings"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <RiHomeHeartLine className="size-5" /> My Bookings
            </Link>
          )}

          <button
            className="flex items-center  gap-2 text-red-600 hover:text-red-800 text-md"
            onClick={logout}
          >
            <FaSignOutAlt className="size-5" />
            Logout
          </button>
        </div>
      ) : (
        <p>
          Create a profile? <Link to="/register">Register here</Link>
        </p>
      )}
    </div>
  );
};

export default Profile;
