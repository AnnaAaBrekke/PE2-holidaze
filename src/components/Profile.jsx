import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();

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
