import React from "react";
import Profile from "../../components/Profile";
import { useAuth } from "../../context/AuthContext";
import UserBookings from "../../components/UserBookings";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <Profile />
      {user && !user.venueManager && <UserBookings />}
    </div>
  );
};

export default ProfilePage;
