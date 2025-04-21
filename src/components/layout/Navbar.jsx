import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <>
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/manager">Manager Dashboard</Link>
        <Link to="/about">About Us</Link>
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <p>Name: {user?.name}</p>
            <button onClick={logout} className="btn btn-light">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
