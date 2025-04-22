import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EditProfileForm from "./forms/EditProfile";
import { useEffect, useState, useRef } from "react";

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
    <div>
      {isAuthenticated ? (
        <>
          <img
            src={user?.avatar?.url || "https://placehold.co/150"}
            alt={user?.avatar?.alt || user?.name}
            className="h-32 w-32 rounded-full"
          />
          <h2>{user?.name}</h2>
          <h3>{user?.venueManager ? "Venue Manager" : "Customer"}</h3>
          <p>{user?.bio || "Bio placeholder.."}</p>

          <button onClick={handleEditProfileClick}>
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
            <Link to="/manager">My Venues</Link>
          ) : (
            <Link to="/bookings">My Bookings</Link>
          )}

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>
          Create a profile? <Link to="/register">Register here</Link>
        </p>
      )}
    </div>
  );
};

export default Profile;
