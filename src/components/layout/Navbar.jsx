import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/bookings">My Bookings</Link>
      <Link to="/manager">Manager Dashboard</Link>
      <Link to="/about">About Us</Link>
    </>
  );
};

export default Navbar;
