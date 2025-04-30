import React from "react";
import Profile from "../../components/Profile";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
