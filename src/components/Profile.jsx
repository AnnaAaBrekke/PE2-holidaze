import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EditProfileForm from "./forms/EditProfile";
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
    <div className="p-6 max-w-4xl mx-auto">
      {isAuthenticated ? (
        <div className="flex flex-col items-center text-center bg-[#E0F9F6] p-8 rounded-xl shadow-lg">
          {/* Avatar */}
          <img
            src={
              user?.avatar?.url ||
              "https://plus.unsplash.com/premium_photo-1682308170035-ec5ef069ee10?w=1400&auto=format&fit=crop&q=60"
            }
            alt={user?.avatar?.alt || "Avatar"}
            className="h-32 w-32 rounded-full border-2 border-[#0F6474] mb-4 object-cover"
          />

          {/* Name */}
          <h2 className="text-2xl font-bold text-[#08323B]">{user?.name}</h2>

          {/* Role */}
          <h3 className="text-sm text-[#96A88E] mb-2">
            {user?.venueManager ? "Venue Manager" : "Customer"}
          </h3>

          {/* Bio */}
          <p
            className="text-[#6A6773] text-sm mb-6 max-w-sm
          "
          >
            {user?.bio || "No bio provided."}
          </p>

          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfileClick}
            className="bg-[#0F6474] hover:bg-[#0E4551] text-white font-semibold px-6 py-2 rounded-full mb-6 transition-all"
          >
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
                className="flex items-center gap-2 bg-[#AFCDA2] text-[#08323B] hover:bg-[#96A88E] font-medium py-2 px-4 rounded-full w-full justify-center transition"
              >
                <RiHomeGearLine className="text-lg" />
                Manage Venues
              </Link>
            ) : (
              <Link
                to="/bookings"
                className="flex items-center gap-2 bg-[#AFCDA2] text-[#08323B] hover:bg-[#96A88E] font-medium py-2 px-4 rounded-full w-full justify-center transition"
              >
                <RiHomeHeartLine className="text-lg" />
                My Bookings
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-[#E85757] text-white hover:bg-red-600 font-medium py-2 px-4 rounded-full w-full justify-center transition"
            >
              <FaSignOutAlt className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center mt-3">
          Create a profile?
          <Link to="/register" className="text-blue-600 hover:underline">
            <br />
            Register here
          </Link>
        </p>
      )}
    </div>
  );
};

export default Profile;
